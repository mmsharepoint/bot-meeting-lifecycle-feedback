import { Feedback } from "../models/Feedback";

export default class AdaptiveCardSvc { 
    private static initialFeedback: Feedback = {
        meetingID: "",
        votedPersons: [],
        votes1: 0,
        votes2: 0,
        votes3: 0,
        votes4: 0,
        votes5: 0
    };

    private static basicCard = {
        type: "AdaptiveCard",
        schema: "http://adaptivecards.io/schemas/adaptive-card.json",
        version: "1.4",
        refresh: {
            action: {
                type: "Action.Execute",
                title: "Refresh",
                verb: "alreadyVoted",
                data: {
                      feedback: {}
                }
            },
            userIds: ["00000000-0000-0000-0000-000000000000"]
        },
        body: [
            {
                type: "TextBlock",
                text: "How did you like the meeting?",
                wrap: true
            },
            {
                type: "ActionSet",
                actions: []
            }
        ]
    };

    private static votingActions = [
        {
            type: "Action.Execute",
            title: " ",
            verb: "vote_1",
            iconUrl: `https://${process.env.PUBLIC_HOSTNAME}/assets/1.png`,
            data: {
                feedback: {}
            }
        },
        {
            type: "Action.Execute",
            title: " ",
            verb: "vote_2",
            iconUrl: `https://${process.env.PUBLIC_HOSTNAME}/assets/2.png`,
            data: {
                feedback: {}
            }
        },
        {
            type: "Action.Execute",
            title: " ",
            verb: "vote_3",
            iconUrl: `https://${process.env.PUBLIC_HOSTNAME}/assets/3.png`,
            data: {
                feedback: {}
            }
        },
        {
            type: "Action.Execute",
            title: " ",
            verb: "vote_4",
            iconUrl: `https://${process.env.PUBLIC_HOSTNAME}/assets/4.png`,
            data: {
                feedback: {}
            }
        },
        {
            type: "Action.Execute",
            title: " ",
            verb: "vote_5",
            iconUrl: `https://${process.env.PUBLIC_HOSTNAME}/assets/5.png`,
            data: {
                feedback: {}
            }
        }
    ];

    public static getInitialCard(meetingID: string) {
        let initialFeedback = this.initialFeedback;
        initialFeedback.meetingID = meetingID;
        const card: any = this.basicCard;
        card.body[1].actions = this.votingActions;
        card.body[1].actions[0].data.feedback = initialFeedback;
        card.body[1].actions[1].data.feedback = initialFeedback;
        card.body[1].actions[2].data.feedback = initialFeedback;
        card.body[1].actions[3].data.feedback = initialFeedback;
        card.body[1].actions[4].data.feedback = initialFeedback;
        card.refresh.action.data.feedback = initialFeedback;
        return card;
    }

    public static getCurrentCard(feedback: Feedback) {
        const card: any = this.basicCard;
        card.body[1].actions = this.votingActions;
        card.body[1].actions[0].data.feedback = feedback;
        card.body[1].actions[1].data.feedback = feedback;
        card.body[1].actions[2].data.feedback = feedback;
        card.body[1].actions[3].data.feedback = feedback;
        card.body[1].actions[4].data.feedback = feedback;
        card.refresh.action.data.feedback = feedback;
        card.refresh.userIds = feedback.votedPersons;
        return card;
    }

    public static getDisabledCard(feedback: Feedback) {
        const card: any = this.basicCard;
        card.body[1].actions = [];
        card.refresh.action.data.feedback = feedback;
        return card;
    }
}