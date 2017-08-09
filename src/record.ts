export class Record {
  modelName:string
  multiple:boolean
  dependents: Record[]
  fields

  constructor(model:string, multiple=false, dependents?:Record[]) {
    this.modelName = model
    this.multiple = multiple
    this.dependents = dependents || []
  }

  makeMultiple() {
    this.multiple = true
    return this
  }

  addDependent(record:Record) {
    this.dependents.push(record)
    return this
  }

  addFields(fields) {
    this.fields = fields
  }
}

export class RecordMaker {
  records: Record[]

  constructor() {
    this.records = []
  }

  make(model:string) {
    this.records.push(new Record(model))
    return this
  }

  with(model:string) {
    const record = this.records[this.records.length-1]
    record.addDependent(new Record(model))
    return this
  }

  withMultiple(model:string) {
    const record = this.records[this.records.length-1]
    record.addDependent(new Record(model, true))
    return this
  }

  withFields(fields) {
    const record = this.records[this.records.length-1]
    record.addFields(fields)
    return this
  }

  and(model:string) {
    this.records.push(new Record(model))
    return this
  }

}

const turf = new RecordMaker()
const record = turf.make('Frog').and('Toad').withMultiple('Friend')
console.log(record)
