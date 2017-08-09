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
    Turf.prototype.fulfillOrder = function (recordList) {
        var _this = this;
        return recordList.forEach(function (record) { return _this.fulfillRecord(record); });
    };
    Turf.prototype.fulfillRecord = function (record) {
        var _this = this;
        if (record.dependents.length)
            record.dependents.forEach(function (dependent) { return _this.fulfillRecord(dependent); });
        else
            this.model[record.modelName].create(this.fillData(record));
    };
    Turf.prototype.fillData = function (record) {
    };
    Turf.prototype.createFakeInfo = function (dateType) {
    };
    return Turf;
}());
exports.Turf = Turf;
//this is where vineyard ground and Table/Record/Schema come together
//# sourceMappingURL=turf.js.map