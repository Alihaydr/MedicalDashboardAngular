// export class MedicineClass{
//     id? : number;
//     name? : string;
//     category? : number;
//     location? : string;
//     variants? : number;
//     description? : string;
//     expiryDate? : number;
//     quantity? : number;

// constructor(  id : number,name: string,  category: number,location : string, variants : number, description : string, expiryDate : number, quantity : number,){
// this.id = id;
// this.name=name;
// this.category=category;
// this.location=location;
// this.variants=variants;
// this.description=description;
// this.expiryDate=expiryDate;
// this.quantity=quantity;
// }
//   }

// export class transactionPullClass{
//    id?: number;
//    item_id? : number;
//    consumer? : string;
//    transactionType? : 'pull';
//    transactionDate ? : string;
//    patientReportLink ?: string;

// constructor(    id: number,
//                 item_id : number,
//                 consumer : string,
//                 transactionType : 'pull',
//                 transactionDate : string,
//                 patientReportLink : string,){

//       this.id=id;
//       this.item_id=item_id;
//       this.consumer=consumer;
//       this.transactionType=transactionType;
//       this.transactionDate=transactionDate;
//       this.patientReportLink=patientReportLink;
// }
//   }

// export class transactionPushClass{
//   id?: number;
//   item_id? : number;
//   user? : string;
//   transactionType? : 'push';
//   transactionDate ? : string;
//   patientReportLink ?: string;

// constructor(    id: number,
//                item_id : number,
//                user : string,
//                transactionType : 'push',
//                transactionDate : string,
//                patientReportLink : string,){

//      this.id=id;
//      this.item_id=item_id;
//      this.user=user;
//      this.transactionType=transactionType;
//      this.transactionDate=transactionDate;
//      this.patientReportLink=patientReportLink;
// }
//  }


export class logInInfo{
    username: string = "";
    password: string = "";

//   constructor(username: string, password:string){
//         this.username = username;
//         this.password = password;
// }
[key: string]: string | undefined;

  }


export class SignUp{
     id? : number;
    username? : string;
    role? : string;
    phoneNumber? : string;
    password? : string;
    birthDay? : string;
  imageUrl?:string;


  constructor(id: number, username: string, role: string, birthDay:string, password:string, phoneNumber:string, imageUrl:string){
    this.id = id;
    this.username = username;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
        this.birthDay = birthDay;
        this.imageUrl = imageUrl
}

  }

export class Consumer{
      id?: number =0;
      name?: string ='';
      phoneNumber?: string='';
      birthdate?: string='';
      documents?: string='';
      location?: string='';
      items?: Item[];

      [key: string]: string | undefined| any;

}

export class Item {
  id: number = 0;
  name: string = '';
  notes?: string | null = null;
  variants?: string[] = [];
  quantity?: number = 0;
  expiryDate?: string = '';
  location?: string = '';
  itemValidity:number = 0;
  categories?: Category[];

  [key: string]: string | undefined |any;

}


export class pullTransactions {
  id?: number = 0;
  item?: Item[];
  consumer?: Consumer[];
  transactionType?: string = 'pull';
  transactionDate?: string = '';
  patientReportLink?: string = '';
  
  [key: string]: string | undefined |any;

}

export class pushTransactions {
  id?: number = 0;
  item?: Item[];
  user?: string = '';
  transactionType?: string = 'pull';
  transactionDate?: string = '';
  patientReportLink?: string = '';
  
  [key: string]: string | undefined |any;

}


export class Category {
  id: number = 0;
  category: string = '';

  constructor(id: number = 0, category: string = '') {
    this.id = id;
    this.category = category;
  }
}


export class TransactionPull {
  id: number;
  item: ItemTransaction[];
  consumer: ConsumerTransaction;
  transactionType: string;
  transactionDate: string;
  patientReportLink: string;

  constructor(
    id: number,
    item: ItemTransaction[],
    consumer: ConsumerTransaction,
    transactionType: string,
    transactionDate: string,
    patientReportLink: string
  ) {
    this.id = id;
    this.item = item;
    this.consumer = consumer;
    this.transactionType = transactionType;
    this.transactionDate = transactionDate;
    this.patientReportLink = patientReportLink;
  }
}

export class ItemTransaction {
  id: number;
  name:string;
  pullQuantity: number;

  constructor(id: number, name:string,pullQuantity: number) {
    this.id = id;
    this.name = name;
    this.pullQuantity = pullQuantity;
  }
}

export class ConsumerTransaction {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}



export class tempA {
  id: number = 0;
  qty : number = 0;
}




export class MainQty {
  id: number = 0;
  qty : number = 0;
}