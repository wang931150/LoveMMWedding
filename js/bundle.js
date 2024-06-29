"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // src/component/MainBox.ts
  var { regClass, property } = Laya;
  var MainBox = class extends Laya.Script {
    constructor() {
      super();
      /**开始时间*/
      this._time = 0;
    }
    onEnable() {
    }
    onStart() {
      this._time = Date.now();
      this.owner.y = 0;
    }
    onUpdate() {
      let now = Date.now();
      let owner = this.owner;
      if (owner.y > -5060) {
        if (now - this._time > 3e3) {
          owner.y -= 3;
        } else if (now - this._time > 1e3) {
          owner.y -= 1 + (now - this._time) / 1500;
        }
      }
    }
    onDisable() {
    }
  };
  MainBox = __decorateClass([
    regClass("wTr0-ChuRhSajj1kBLxlWA")
  ], MainBox);

  // src/scene/MainScene.ts
  var { regClass: regClass2, property: property2 } = Laya;
  var DropRule = class {
    constructor(time) {
      this.time = time;
    }
  };
  var MainScene = class extends Laya.Script {
    constructor() {
      super();
      /** @prop {name:createBoxInterval,tips:"拍子",type:int,default:1000}*/
      this.ruleDelta = 300;
      this.createBoxInterval = 0;
      /**开始时间*/
      this._time = 0;
      /**是否已经开始游戏 */
      this._started = false;
      /**是否停止每帧更新 */
      this.updateStop = false;
      this.ruleIndex = 0;
      this.rules = [
        new DropRule(0 * this.ruleDelta),
        new DropRule(1 * this.ruleDelta),
        new DropRule(2 * this.ruleDelta),
        new DropRule(4 * this.ruleDelta),
        new DropRule(5 * this.ruleDelta),
        new DropRule(6 * this.ruleDelta),
        new DropRule(7 * this.ruleDelta),
        new DropRule(8 * this.ruleDelta),
        new DropRule(9 * this.ruleDelta),
        new DropRule(10 * this.ruleDelta),
        new DropRule(12 * this.ruleDelta),
        new DropRule(13 * this.ruleDelta),
        new DropRule(14 * this.ruleDelta),
        new DropRule(15 * this.ruleDelta),
        new DropRule(16 * this.ruleDelta),
        new DropRule(17 * this.ruleDelta),
        new DropRule(18 * this.ruleDelta),
        new DropRule(20 * this.ruleDelta),
        new DropRule(21 * this.ruleDelta),
        new DropRule(22 * this.ruleDelta),
        new DropRule(23 * this.ruleDelta),
        new DropRule(24 * this.ruleDelta),
        new DropRule(25 * this.ruleDelta),
        new DropRule(26 * this.ruleDelta),
        new DropRule(28 * this.ruleDelta),
        new DropRule(29 * this.ruleDelta),
        new DropRule(30 * this.ruleDelta),
        new DropRule(31 * this.ruleDelta),
        new DropRule(32 * this.ruleDelta),
        new DropRule(33 * this.ruleDelta),
        new DropRule(34 * this.ruleDelta),
        new DropRule(36 * this.ruleDelta),
        new DropRule(37 * this.ruleDelta),
        new DropRule(38 * this.ruleDelta),
        new DropRule(39 * this.ruleDelta),
        new DropRule(40 * this.ruleDelta),
        new DropRule(41 * this.ruleDelta),
        new DropRule(42 * this.ruleDelta),
        new DropRule(44 * this.ruleDelta),
        new DropRule(45 * this.ruleDelta),
        new DropRule(46 * this.ruleDelta),
        new DropRule(47 * this.ruleDelta),
        new DropRule(48 * this.ruleDelta),
        new DropRule(49 * this.ruleDelta),
        new DropRule(50 * this.ruleDelta),
        new DropRule(52 * this.ruleDelta),
        new DropRule(53 * this.ruleDelta),
        new DropRule(54 * this.ruleDelta)
      ];
    }
    onEnable() {
      let resArr = [
        "resources/Texture/note1.png",
        "resources/Texture/note2.png",
        "resources/Texture/note3.png",
        "resources/Texture/photograph.png",
        "resources/Texture/pinao.png",
        { url: "prefab/DropBox1.lh", type: Laya.Loader.HIERARCHY },
        { url: "prefab/DropBox2.lh", type: Laya.Loader.HIERARCHY },
        { url: "prefab/DropBox3.lh", type: Laya.Loader.HIERARCHY },
        // { url: "resources/sound/BGM.m4a", type: Laya.Loader.BUFFER },
        { url: "resources/atlas/destory.atlas", type: Laya.Loader.ATLAS }
      ];
      Laya.loader.load(resArr).then((res) => {
        this._gameBox = this.owner.getChildByName("gameBox");
        Laya.stage.on(Laya.Event.BLUR, this, () => {
          this.updateStop = true;
        });
        Laya.stage.on(Laya.Event.FOCUS, this, () => {
          this.updateStop = false;
        });
      });
    }
    //涉及到与屏幕适配相关逻辑，必须要放到onStart里，否则就可能因适配值没计算完，导致一系列的问题
    onStart() {
      let _ground = this.owner.getChildByName("ground").getComponent(Laya.BoxCollider);
      _ground.width = Laya.stage.width;
      if (!this._started) {
        this._started = true;
        this.enabled = true;
      }
      this.ruleIndex = 0;
      this._time = 0;
      Laya.SoundManager.playSound("resources/sound/BGM.m4a");
    }
    onUpdate() {
      if (this.updateStop)
        return;
      let now = Date.now();
      if (this._started) {
        if (now - this._time >= this.createBoxInterval) {
          this.createBoxInterval = 1500 + Math.random() * 500;
          this._time = now;
          this.createBox();
        }
      }
    }
    createBox() {
      let index = Math.floor(Math.random() * 3);
      let dropBox;
      if (index == 1) {
        dropBox = this.dropBox1;
      } else if (index == 2) {
        dropBox = this.dropBox2;
      } else if (index == 3) {
        dropBox = this.dropBox3;
      }
      let box = Laya.Pool.getItemByCreateFun("dropBox" + index, dropBox.create, dropBox);
      box.pos(Math.random() * (Laya.stage.width - 200) + 100, 0);
      this._gameBox.addChild(box);
    }
    stopGame() {
      this._started = false;
      this.enabled = false;
      this._gameBox.removeChildren();
    }
  };
  __decorateClass([
    property2({ type: Laya.Prefab })
  ], MainScene.prototype, "dropBox1", 2);
  __decorateClass([
    property2({ type: Laya.Prefab })
  ], MainScene.prototype, "dropBox2", 2);
  __decorateClass([
    property2({ type: Laya.Prefab })
  ], MainScene.prototype, "dropBox3", 2);
  MainScene = __decorateClass([
    regClass2("0dtPzonyRZGvoveXaZaLrw")
  ], MainScene);

  // src/scene/MainSceneRT.generated.ts
  var MainSceneRTBase = class extends Laya.Scene {
  };

  // src/scene/MainSceneRT.ts
  var { regClass: regClass3, property: property3 } = Laya;
  var MainSceneRT = class extends MainSceneRTBase {
    constructor() {
      super();
      MainSceneRT.instance = this;
    }
    onEnable() {
      this._control = this.getComponent(MainScene);
      this._score = 0;
    }
    onBtnClick(e) {
      this.copyTxt.text = "已复制";
    }
    addScore(count) {
    }
  };
  MainSceneRT = __decorateClass([
    regClass3("zhpDjUZFQuC2C8k1wfWigw")
  ], MainSceneRT);

  // src/prefab/DropBox.ts
  var { regClass: regClass4, property: property4 } = Laya;
  var DropBox = class extends Laya.Script {
    constructor() {
      super();
      /**盒子等级 */
      this.index = 1;
    }
    onEnable() {
      this._rig = this.owner.getComponent(Laya.RigidBody);
      this._ani = new Laya.Animation();
    }
    onUpdate() {
      this.owner.rotation++;
      this.owner.y += Laya.stage.height / 320;
    }
    onTriggerEnter(other, self, contact) {
      var owner = this.owner;
      if (other.label === "ground") {
        MainSceneRT.instance.addScore(1);
        if (owner.parent) {
          let effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
          Laya.Animation.createFrames("resources/atlas/destory.atlas", "destory");
          effect.pos(owner.x - owner.width, owner.y - owner.height / 2);
          effect.scale(2, 2);
          owner.parent.addChild(effect);
          effect.play(0, true);
        }
        owner.removeSelf();
      }
    }
    /**使用对象池创建爆炸动画 */
    createEffect() {
      let ani = new Laya.Animation();
      ani.loadAtlas("resources/atlas/destory.atlas");
      ani.on(Laya.Event.COMPLETE, null, recover);
      function recover() {
        ani.removeSelf();
        Laya.Pool.recover("effect", ani);
      }
      return ani;
    }
    onDisable() {
      Laya.Pool.recover("dropBox" + this.index, this.owner);
    }
  };
  __decorateClass([
    property4({ type: "number" })
  ], DropBox.prototype, "index", 2);
  DropBox = __decorateClass([
    regClass4("3L23NCFLSAieUApqTrVoCQ")
  ], DropBox);
})();
