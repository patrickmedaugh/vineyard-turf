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
    Record.prototype.addFields = function (fields) {
        this.fields = fields;
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
        return this;
    };
    RecordMaker.prototype.withFields = function (fields) {
        var record = this.records[this.records.length - 1];
        record.addFields(fields);
        return this;
    };
    RecordMaker.prototype.and = function (model) {
        this.records.push(new Record(model));
        return this;
    };
    return RecordMaker;
}());
exports.RecordMaker = RecordMaker;
var maker = new RecordMaker();
var record = maker.make('Frog').and('Toad').withMultiple('Friend').withFields({ 'friendcode': 123 });
//# sourceMappingURL=record.js.map