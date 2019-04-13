var npc_zinaida = {
    "name": "Вахтёрша Зинаида",
    "animation": "anim_zinaida",
    "dimensions": [32, 32],
    "hp": 1,
    "automatic": true,
    "pickable": false,
    "activationRadius": 96,
    "actions": [
        {
            "text": "~Ой, я забыл сменку",
        },
        {
            "default": true,
            "text": "Иванов! Быстро сдал свои манатки в гардероб!"
        },
        {
            "text": "Так... А где вторая обувь?",
            "answers": [
                ["извините, сегодня забыл", "set zina 1"],
                ["в портфеле", "set zina 2"],
                ["*ничего не говорить", "set zina 3"]
            ]
        },
        {
            "condition": "zina 1",
            "text": "Не извиню!\nЛибо бери бахилы, либо иди домой за обувью"
        },
        {
            "condition": "zina 2",
            "text": "Ну так доставай и переобувайся.\nили хочешь чтоб я полы за тобой мыла?"
        },
        {
            "condition": "zina 3",
            "text": "Молодой человек, я вообще-то с вами разговариваю"
        }
    ]
}