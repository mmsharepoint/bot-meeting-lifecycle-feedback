import { BotDeclaration } from "express-msteams-host";
import * as debug from "debug";
import { StatePropertyAccessor, CardFactory, TurnContext, MemoryStorage, ConversationState, ActivityTypes, TeamsActivityHandler, MessageFactory, ResourceResponse, StatusCodes, InvokeResponse } from "botbuilder";
import AdaptiveCardSvc from "../../services/AdaptiveCardSvc";
import { Feedback } from "../../models/Feedback";
// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for bot meeting lifecycle feedback Bot
 */
@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    // eslint-disable-next-line no-undef
    process.env.MICROSOFT_APP_ID,
    // eslint-disable-next-line no-undef
    process.env.MICROSOFT_APP_PASSWORD)

export class BotMeetingLifecycleFeedbackBot extends TeamsActivityHandler {
    /**
     * The constructor
     * @param conversationState
     */
     public constructor(conversationState: ConversationState) {
        super();
    }

    async onInvokeActivity(context: TurnContext): Promise<InvokeResponse<any>> {
        if (context.activity.value.action.verb === "alreadyVoted") {
            const persistedFeedback: Feedback = context.activity.value.action.data.feedback;
            const card = AdaptiveCardSvc.getDisabledCard(persistedFeedback);
            const cardRes = {
                statusCode: StatusCodes.OK,
                type: 'application/vnd.microsoft.card.adaptive',
                value: card
            };
            const res = {
                status: StatusCodes.OK,
                body: cardRes
            };
            return res;
        }

        if (context.activity.type == 'invoke') {
            log(context.activity.value.action.data);
            log(context.activity.value.action.verb);
            log(context.activity.from.aadObjectId);
            log(context.activity.from.name);
            const persistedFeedback: Feedback = context.activity.value.action.data.feedback;
            persistedFeedback.votedPersons.push(context.activity.from.aadObjectId!);
            switch (context.activity.value.action.verb) {
                case "vote_1":
                    persistedFeedback.votes1 += 1;
                    break;
                case "vote_2":
                    persistedFeedback.votes2 += 1;
                    break;
                case "vote_3":
                    persistedFeedback.votes3 += 1;
                    break;
                case "vote_4":
                    persistedFeedback.votes4 += 1;
                    break;
                case "vote_5":
                    persistedFeedback.votes5 += 1;
                    break;
            };
            const card = CardFactory.adaptiveCard(AdaptiveCardSvc.getCurrentCard(persistedFeedback));
            const message = MessageFactory.attachment(card);
            message.id = context.activity.replyToId;
            
            var response = await context.updateActivity(message);
            // return Promise.resolve(response);
            // const cardRes = {
            //     statusCode: StatusCodes.OK,
            //     type: 'application/vnd.microsoft.card.adaptive',
            //     value: card
            // };
            // const res = {
            //     status: StatusCodes.OK,
            //     body: cardRes
            // };
        }

        return {
            status: StatusCodes.OK
        };
    };

    async onEventActivity(context) {
        if (context.activity.type == 'event' && context.activity.name == "application/vnd.microsoft.meetingStart") {
            var meetingObject = context.activity.value;
            const card = CardFactory.adaptiveCard(AdaptiveCardSvc.getInitialCard(meetingObject.Id));
            const message = MessageFactory.attachment(card);
            await context.sendActivity(message);
        }
    
        if (context.activity.type == 'event' && context.activity.name == "application/vnd.microsoft.meetingEnd") {
            var meetingObject = context.activity.value;
            await context.sendActivity(`Meeting ${meetingObject.Title} ended at ${meetingObject.EndTime}`);
        }
    };   
    // async onTurnActivity(context) {
        

    //     if (context.activity.value.action.verb === "alreadyVoted") {
    //         const persistedFeedback: Feedback = context.activity.value.action.data.feedback;
    //         const card = AdaptiveCardSvc.getDisabledCard(persistedFeedback);
    //         const cardRes = {
    //             statusCode: StatusCodes.OK,
    //             type: 'application/vnd.microsoft.card.adaptive',
    //             value: card
    //         };
    //         const res = {
    //             status: StatusCodes.OK,
    //             body: cardRes
    //         };
    //         return Promise.resolve(res);
    //     }

    //     if (context.activity.type == 'invoke') {
    //         log(context.activity.value.action.data);
    //         log(context.activity.value.action.verb);
    //         log(context.activity.from.aadObjectId);
    //         log(context.activity.from.name);
    //         const persistedFeedback: Feedback = context.activity.value.action.data.feedback;
    //         persistedFeedback.votedPersons.push(context.activity.from.aadObjectId);
    //         switch (context.activity.value.action.verb) {
    //             case "vote_1":
    //                 persistedFeedback.votes1 += 1;
    //                 break;
    //             case "vote_2":
    //                 persistedFeedback.votes2 += 1;
    //                 break;
    //             case "vote_3":
    //                 persistedFeedback.votes3 += 1;
    //                 break;
    //             case "vote_4":
    //                 persistedFeedback.votes4 += 1;
    //                 break;
    //             case "vote_5":
    //                 persistedFeedback.votes5 += 1;
    //                 break;
    //         };
    //         const card = CardFactory.adaptiveCard(AdaptiveCardSvc.getCurrentCard(persistedFeedback));
    //         const message = MessageFactory.attachment(card);
    //         message.id = context.activity.replyToId;
            
    //         var response = await context.updateActivity(message);
    //         return Promise.resolve(response);
    //     }
    // };
}
