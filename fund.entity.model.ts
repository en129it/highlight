export class FundEntityEnumItem {

  constructor(private code) {

  }

  public getCode() {
    return this.code;
  } 
}

export class FundEntityEnum {

  static A = new FundEntityEnumItem('a');
  static B = new FundEntityEnumItem('b');

  public static toEnum(code: string): FundEntityEnumItem {
    if (code === FundEntityEnum.A.getCode()) {
      return FundEntityEnum.A;
    }
    if (code === FundEntityEnum.B.getCode()) {
      return FundEntityEnum.B;
    }
  }

}

export class FundEntity {
  uuid: string;
  names: string[];
}

export class FundEntityGroup {

  constructor(public type: string, public entities: FundEntity[], public isTruncated: boolean) {
  }
}
