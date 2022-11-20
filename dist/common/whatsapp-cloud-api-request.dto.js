"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataApiRequest = exports.dataNotificationApiRequest = void 0;
exports.dataNotificationApiRequest = {
    "messaging_product": "whatsapp",
    "to": "",
    "type": "template",
    "template": {
        "name": "",
        "language": {
            "code": "es"
        },
        "components": [{
                "type": "body",
                "parameters": [
                    {
                        "type": "text",
                        "text": ""
                    },
                    {
                        "type": "text",
                        "text": ""
                    }
                ]
            },
            {
                "type": "button",
                "sub_type": "url",
                "index": "0",
                "parameters": [
                    {
                        "type": "text",
                        "text": ""
                    }
                ]
            }]
    }
};
exports.dataApiRequest = {
    "messaging_product": "whatsapp",
    "to": "",
    "type": "template",
    "template": {
        "name": "",
        "language": {
            "code": "es"
        },
        "components": [{
                "type": "body",
                "parameters": [
                    {
                        "type": "text",
                        "text": "",
                    },
                    {
                        "type": "text",
                        "text": ""
                    },
                    {
                        "type": "text",
                        "text": ""
                    }
                ]
            },
            {
                "type": "button",
                "sub_type": "quick_reply",
                "index": "0",
                "parameters": [{
                        "type": "payload",
                        "payload": ""
                    }]
            },
            {
                "type": "button",
                "sub_type": "quick_reply",
                "index": "1",
                "parameters": [{
                        "type": "payload",
                        "payload": ""
                    }]
            }]
    }
};
//# sourceMappingURL=whatsapp-cloud-api-request.dto.js.map