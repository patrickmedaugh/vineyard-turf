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

  fulfillRecord(record) {
    this.model[record].create()
  }

  createFakeInfo(table: Table) {

  }
}

//this is where vineyard ground and Table/Record/Schema come together
