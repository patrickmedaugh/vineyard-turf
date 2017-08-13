"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var record_1 = require("./record");
var sampleSchema = require('./sampleSchema.json');
var uuid = require('uuid');
var Turf = (function () {
    function Turf(schema, vineyardGround) {
        this.schema;
        this.model = vineyardGround;
    }
    Turf.prototype.createTables = function () {
        this.tables = this._parseSchema();
    };
    Turf.prototype._parseSchema = function () {
        var _this = this;
        var tableNames = Object.keys(this.schema);
        var tables = [];
        tableNames.forEach(function (table) {
            tables.push({ name: table, properties: _this.schema[table]['properties'] });
        });
        return tables;
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
        var _this = this;
        var properties = this.tables.find(function (table) { return table.name === record.modelName; })['properties'];
        var accumulator = {};
        Object.keys(properties).forEach(function (prop) {
            Object.assign(accumulator, { prop: _this.createFakeInfo(prop['type']) });
        });
        return properties;
    };
    Turf.prototype.createFakeInfo = function (dataType) {
        var output;
        switch (dataType) {
            case 'string':
                output = Math.random().toString(26).slice(2);
                break;
            case 'int':
                output = Math.ceil(Math.random() * 10);
                break;
            case 'float':
                output = Math.random() * 10;
            case 'uuid':
                output = uuid.v4();
            case 'dateTime':
                output = new Date().toISOString();
            default:
                throw new Error('Not a valid data type');
        }
        return output;
    };
    return Turf;
}());
exports.Turf = Turf;
var model = {
    create: function (props) { console.log(props); }
};
var maker = new record_1.RecordMaker();
var record = maker.make('Frog').and('Toad').withMultiple('Friend').withFields({ 'friendcode': 123 });
console.log(record.records[1].fields);
var turf = new Turf(sampleSchema, model);
turf.fulfillOrder(record.records);
//# sourceMappingURL=turf.js.map