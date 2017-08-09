"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Turf = (function () {
    function Turf(schema, vineyardGround) {
        this.schema;
        this.model = vineyardGround;
    }
    Turf.prototype.createTables = function () {
        this.schema.keys();
    };
    Turf.prototype.grabRequiredFields = function (record) {
    };
    Turf.prototype.fulfillRecord = function (record) {
        this.model[record].create();
    };
    Turf.prototype.createFakeInfo = function (table) {
    };
    return Turf;
}());
exports.Turf = Turf;
//this is where vineyard ground and Table/Record/Schema come together
//# sourceMappingURL=turf.js.map