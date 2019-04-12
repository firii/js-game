var npc_zinaida = {
    "name": "Вахтёрша Зинаида",
    "animation": "anim_zinaida",
    "dimensions": [32, 32],
    "hp": 1,
    "automatic": false,
    "pickable": false,
    "activationRadius": 96,
    "actions": [
        {
            "text": ["~Ой, я забыл сменку"]
        },
        {
            "text": ["Иванов! Быстро сдал свои манатки в гардероб!"]
        },
        {
            "text": ["Так... А где вторая обувь?"],
            "answers": [
                ["извините, сегодня забыл"],
                ["!взять бахилы", "pakety 1", "set pakety 2"],
                ["!убежать", "set ran"]
            ],
            "time": 10
        },
        {
            "text": ["вуафгду еуче еуые"],
            "commands": ["def"]
        },
        {
            "getFrom": "pollQuestion1"
        }
    ],
    "pollQuestion1": [
        {
            "text": ["Формула герона?"],
            "answers": [
                ["корень из p*(p-a)*(p-b)*(p-c)"],
                ["!взять бахилы"],
                ["!убежать", "set ran"]
            ],
            "time": 10
        },
    ]
}