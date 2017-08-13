import { Record, RecordMaker } from './record'
const sampleSchema = require('./sampleSchema.json')
const uuid = require('uuid')

export interface Schema {
  tables: Table[]
}

export interface Table {
  requiredFields: string[]
  primaryKey: string
  foreignKeys: string[]
}

export class Turf {
  schema
  model
  tables

  constructor(schema, vineyardGround) {
    this.schema
    this.model = vineyardGround
  }

  createTables() {
    this.tables = this._parseSchema()
  }

  _parseSchema() {
    const tableNames = Object.keys(this.schema)
    let tables = []
    tableNames.forEach(table => {
      tables.push({name: table, properties: this.schema[table]['properties']})
    })
    return tables
  }

  fulfillOrder(recordList) {
    return recordList.forEach(record => this.fulfillRecord(record))
  }

  fulfillRecord(record) {
    if(record.dependents.length)
      record.dependents.forEach(dependent => this.fulfillRecord(dependent))
    else
      this.model[record.modelName].create(this.fillData(record))
  }

  fillData(record) {
    const properties = this.tables.find(table => table.name === record.modelName)['properties']
    const accumulator = {}
    Object.keys(properties).forEach(prop => {
      Object.assign(accumulator, { prop: this.createFakeInfo(prop['type'])})
    })
    return properties
  }

  createFakeInfo(dataType:string) {
    let output
    switch(dataType) {
      case 'string':
        output = Math.random().toString(26).slice(2)
        break
      case 'int':
        output = Math.ceil(Math.random() * 10)
        break
      case 'float':
        output = Math.random() * 10
      case 'uuid':
        output = uuid.v4()
      case 'dateTime':
        output =  new Date().toISOString()
      default:
        throw new Error('Not a valid data type')
    }
    return output
  }
}

const model = {
  create: function(props) { console.log(props)}
}

const maker = new RecordMaker()
const record = maker.make('Frog').and('Toad').withMultiple('Friend').withFields({'friendcode': 123})
console.log(record.records[1].fields)
const turf = new Turf(sampleSchema, model)

turf.fulfillOrder(record.records)
