export class adapticeCardSvc {
    private basicCard = {
        type: "AdaptiveCard",
        schema: "http://adaptivecards.io/schemas/adaptive-card.json",
        version: "1.4",
        body: [
            {
                type: "TextBlock",
                text: "How did you like the meeting?",
                wrap: true
            },
            {
                type: "ActionSet",
                actions: [
                    {
                        type: "Action.Submit",
                        iconUrl: "https://mmodocumentapproval.azurewebsites.net/assets/icon.png"
                    },
                    {
                        type: "Action.Submit",
                        iconUrl: "https://mmodocumentapproval.azurewebsites.net/assets/icon.png"
                    },
                    {
                        type: "Action.Submit",
                        iconUrl: "https://mmodocumentapproval.azurewebsites.net/assets/icon.png"
                    },
                    {
                        type: "Action.Submit",
                        iconUrl: "https://mmodocumentapproval.azurewebsites.net/assets/icon.png"
                    },
                    {
                        type: "Action.Submit",
                        iconUrl: "https://mmodocumentapproval.azurewebsites.net/assets/icon.png"
                    }
                ]
            }
        ]
    }
}