/*globals Base */

(function(exports) {
  var BranchNode = exports.Node.extend({
    constructor: function(config) {
      this.base(config);
      this.children = this.nodes || [];
    },
    canRun: function() {
      return this.children.length > 0;
    },
    start: function() {
      this._actualTask = 0;
    },
    run: function(object) {
      this.start();
      if (this._actualTask < this.children.length) {
        this._run(object);
      }
      this.end();
    },
    _run: function(object) {
      var node = this.children[this._actualTask];
      if (node.canRun(object)) {
        node.setControl(this);
        node.start();
        node.run(object);
      }
    },
    running: function(node) {
      this._control.running(node);
    },
    success: function() {
      this.children[this._actualTask].end();
    },
    fail: function() {
      this.children[this._actualTask].end();
    }
  });

  exports.BranchNode = BranchNode;
}(BehaviorTree));