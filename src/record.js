"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Record = (function () {
    function Record(model, multiple, dependents) {
        if (multiple === void 0) { multiple = false; }
        this.modelName = model;
        this.multiple = multiple;
        this.dependents = dependents || [];
    }
    Record.prototype.makeMultiple = function () {
        this.multiple = true;
        return this;
    };
    Record.prototype.addDependent = function (record) {
        this.dependents.push(record);
        return this;
    };
    return Record;
}());
exports.Record = Record;
var RecordMaker = (function () {
    function RecordMaker() {
        this.records = [];
    }
    RecordMaker.prototype.make = function (model) {
        this.records.push(new Record(model));
        return this;
    };
    RecordMaker.prototype.with = function (model) {
        var record = this.records[this.records.length - 1];
        record.addDependent(new Record(model));
        return this;
    };
    RecordMaker.prototype.withMultiple = function (model) {
        var record = this.records[this.records.length - 1];
        record.addDependent(new Record(model, true));
    };
    RecordMaker.prototype.and = function (model) {
        this.records.push(new Record(model));
        return this;
    };
    RecordMaker.prototype.grab = function (model) {
        return this.records.find(function (record) { return record.modelName === model; });
    };
    return RecordMaker;
}());
exports.RecordMaker = RecordMaker;
var turf = new RecordMaker();
var record = turf.make('Frog').and('Toad').with('Friend').grab('Toad');
console.log(record);
//# sourceMappingURL=record.js.map