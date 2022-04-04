export class StoreUtility {

  static normalize(entityArray: Entity[]) {

    const NormalizedArray = entityArray.reduce((previousValue, currentValue) => {

      const values = { [currentValue._id]: currentValue }
      return { ...previousValue, ...values };
    }, {});
    return NormalizedArray
  }


  // {dsdsd:{id:dsdsd,name:"dasds"}}; -> entities ..{ [currentValue.id]: currentValue }
  // [{id:dsdsd,name:"dasds"}];

  static unNormalized(entities: { [_id: string]: any }) {
    if (!entities) {
      return [];
    } else {
      return Object.keys(entities).map(key => entities[key]);
    }
  }

  // [1,2,3,4,5,1];

  static filterDuplicateIds(ids: string[]) {
    return ids.filter((elem, index, self) => {
      return index === self.indexOf(elem)
    })
  }

  static removeKey(entities: { [_id: string]: any }, id: any) {
    const newObj = { ...entities };
    delete newObj[id];
    return newObj;
  }
}

interface Entity {
  _id: any;
}






