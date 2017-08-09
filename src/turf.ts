import { Record, RecordMaker } from './record'

export interface Schema {
  tables: Table[]
}

export interface Table {

}

export class Turf {
  schema
  recordOrder
  model

  constructor(schema, vineyardGround) {
    this.schema
    this.model = vineyardGround

  }

  createTables() {
    this.schema.keys()
  }

  grabRequiredFields(record:Record) {

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

  }

  createFakeInfo(dateType:string) {

  }
}

//this is where vineyard ground and Table/Record/Schema come together
