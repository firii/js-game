class Interactable extends Living{
    constructor(data) {
        super();
        this.id = data.id;
        this.pos = new Vector(...data.pos);
        this.inactive = data.inactive;
        this._type = Assets.get(data.type);
        this._dim = new Vector(...this._type.dimensions);
        this._facing = data.facing;

        this.pickable = (this._type.pickable) ? true : false;
        this.automatic = (this._type.automatic) ? true : false;
        this.activationRadius = this._type.activationRadius || 96;
        this.avaliable = false;


        this._anim = new AnimationManager(Assets.get(this._type.animation));
        this._anim.setCurrent(this._state + "_" + this._facing);
        
        this.actions = [];
        for (let i = 0; i < this._type.actions.length; i++) {
            this.actions.push(new Action(this._type.actions[i]))
        }

        let lbText = (this.pickable) ? "[E] Осмотреть" : "[E] Говорить";
        this._avaliableLabel = new Label(lbText, 16);
    }

    update() {
        this.avaliable = false;
    }

    render() {
        super.render();
        if (this.avaliable) {
            this._avaliableLabel.pos.setCoords(this.x + this.width/2, this.y);
            this._avaliableLabel.pos.scale(SCALE, SCALE);
            this._avaliableLabel.render();
        }
    }

    get name() { return this._type.name }
}
