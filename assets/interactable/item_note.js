var item_note = {
    "name": "",
    "animation": "anim_note",
    "dimensions": [24, 24],
    "hp": 1,
    "automatic": false,
    "pickable": true,
    "activationRadius": 50,
    "actions": [
        {
            "default": true,
            "text": "~Чья-то шпоргалка\nможет пригодится...",
            "answers": [
                ["*Взять", "set has_note 1", "vanish"],
                ["*Оставить"]
            ]
        }
    ]
}