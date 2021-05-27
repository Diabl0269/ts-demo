/* eslint-disable */
import { Color, TypographyStyle } from "@material-ui/core/index";

/*
This file describes TS utils and techniques
You can head to the end of the file for examples
*/

/*
Module augmentation is the expansion of existing modules, here we will extended material ui's palette 
and can see the effects in 'ThemeProvider.tsx'

Add 0 prop and default props to colors in createPalette function
If you go on to the original type, you will see it doesn't have these types,
*/
declare module "@material-ui/core/index" {
  interface Color {
    0: string;
    main: string;
    light: string;
    dark: string;
  }
}

// Declare object with number index and string value
interface SpecialColor {
  [index: number]: string;
}

// Extend palette colors to have these attribute
declare module "@material-ui/core/styles/createPalette" {
  // For createPalette function
  interface PaletteOptions {
    newSpecialColor: SpecialColor;
  }

  // For the palette usage
  interface Palette {
    newSpecialColor: SpecialColor;
  }

  interface PaletteColor {
    // 0: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  // BG types
  interface TypeBackground {
    sidebar: string;
  }
}

// Typography extension
declare module "@material-ui/core/styles/createTypography" {
  // For creation function
  interface TypographyOptions {
    uniqueFont: TypographyStyle;
  }

  // For usage
  interface Typography {
    uniqueFont: TypographyStyle;
  }
}

// TS utils
// Notice all the props are required but the `optionalProp`
interface SmallInterface {
  name: string;

  // randomStuff and randomStuffRecord are equivalent!
  randomStuff: {
    [key: string]: unknown;
  };
  /*
  Record is like and object which we decide what will be his key and value, its better to use it then 'object' type or {} type
  We will soon see how it can be better used
  */
  randomStuffRecord: Record<string, unknown>;
  optionalProp?: number;
}

//If we will comment one of the required props we will get an error
const smallInterfaceVar: SmallInterface = {
  name: "",
  // Notice how randomStuff and randomStuffRecord can hold any type of value
  randomStuff: {
    stuff: 0
  },
  randomStuffRecord: {
    moreStuff: ""
  }
};

// There are 2 ways of declaring arrays
type array1 = Array<SmallInterface>;
type array2 = SmallInterface[]; // This is our preferred way

const varFromTypeArray: array1 = [
  {
    name: "",
    randomStuff: {
      arrayStuff: 0
    },
    randomStuffRecord: {
      moreArrayStuff: ""
    }
  }
];

// We can create a type by using definitions of other types
type WithLastType = {
  a: SmallInterface["randomStuff"];
};

const withLastTypeVar: WithLastType = {
  a: {},
  // Error
  b: ""
};

enum EnumWithNumbers {
  MALE,
  FEMALE
}

const itemFromEnumWithNumbers: EnumWithNumbers = EnumWithNumbers.MALE;
// console.log("itemFromActualEnum", itemFromEnumWithNumbers); // Will print "0"

enum EnumWithValues {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

const itemFromEnumWithValues: EnumWithValues = EnumWithValues.FEMALE;
// console.log("itemFromEnumWithValues", itemFromEnumWithValues); // Will print "FEMALE"

/*
Type literal is like an enum, but you can't access directly its values as the actual enum type
You can however use your IDE's TS support (usually CTRL + SPACE) to get TS suggestions
*/
type TypeLiteral = "ini" | "mini" | "miny" | "moe";

/*
Using CTRL + SPACE we can get all of the possible values
If we try to pass a value not from the correct type we will get an error
*/
const typeLiteralVar: TypeLiteral = "ini";
// console.log("typeLiteralVar", typeLiteralVar);

// We can also create an array 'as const' and create a type literal from it like this:
const constArray = ["ini", "mini", "miny", "moe"] as const;
type TypeLiteralFromConstArray = typeof constArray[number];
// 'constTypeVar' can now hold any of the specified values in 'constArray'
const constTypeVar: TypeLiteralFromConstArray = "mini";
// This method is really good for keeping enum types same as their JS values!

// Partial makes all of the passed type props as optional
type PartialSmallInterface = Partial<SmallInterface>;
// Notice that we can miss any property from the original type and we won't get an error.
const smallInterfacePartialVar: PartialSmallInterface = {
  name: ""
};

// 'Required' type makes all optional props as required
type RequiredSmallInterface = Required<SmallInterface>;
const smallInterfaceRequiredVar: RequiredSmallInterface = {
  name: "",
  randomStuff: {},
  randomStuffRecord: {},
  // If you try to comment this prop you will get an error
  optionalProp: 0
};

/* 
'Readonly' makes the type a readonly.
As you know js consts are mutable, by using this type we can prevent it
*/
type ReadonlySmallInterface = Readonly<SmallInterface>;
const readOnlySmallInterfaceVar: ReadonlySmallInterface = {
  name: "",
  randomStuff: {
    a: 1
  },
  randomStuffRecord: {}
};

// This will produce an error since 'name' is readonly
readOnlySmallInterfaceVar.name = "1";

// Notice that the nested objects are still mutable, to prevent that we need to declare them as Readonly as well!
readOnlySmallInterfaceVar.randomStuff.a = 2;

// As noted before, we can use record to declare specific types of objects
type RecordWithSpecificValues = Record<TypeLiteral, SmallInterface>;
const recordWithSpecificValuesVar: RecordWithSpecificValues = {
  ini: {
    name: "",
    randomStuff: {},
    randomStuffRecord: {}
  },
  mini: { name: "", randomStuff: {}, randomStuffRecord: {} },
  miny: { name: "", randomStuff: {}, randomStuffRecord: {} },
  moe: { name: "", randomStuff: {}, randomStuffRecord: {} }
};

// 'Pick' is for picking values out of an interface
type PickedValues = Pick<SmallInterface, "name" | "randomStuff">;
// Notice this variable can hold only the picked types
const pickedVar: PickedValues = {
  name: "",
  randomStuff: {}
};

// Omit is for omitting some values out of a type
type OmittedType = Omit<SmallInterface, "randomStuffRecord">;
// Notice we cant add any of the omitted variables
const omittedVar: OmittedType = {
  name: "",
  randomStuff: {}
};

// 'Exclude' is for excluding specific types out of a type
type ExcludedType = Exclude<TypeLiteral, "ini" | "mo">;
// Notice that this var can't be equal to "ini" or "mo"
const excludedVar: ExcludedType = "mini";

// 'NonNullable' is to exclude null or undefined from a type
type NonNullableType = NonNullable<TypeLiteral | null>;
type WithNull = TypeLiteral | null;

// For this you must enable strictNullChecks
// This works
const withNull: WithNull = null;
// This produces an error
const nonNullable: NonNullableType = null;

// 'Extract' is for extracting specific types out of a union type / type literal
type ExtractedType = Extract<TypeLiteral, "ini" | "mini">;
// Any values beside 'ini' and 'mini' will produce error
const extractedVar: ExtractedType = "ini";

// Functions - There are a few ways to declare functions, we can declare them separately
declare function f1(arg: { a: number; b: string }): number;

// We can see that 'args' argument will already have 'a' and 'b'
const func1: typeof f1 = (args) => {
  args.a;
  args.b;
  return 0;
};

// Or we can declare them inline like this
const func = (args: { a: number; b: number }) => {
  return 0;
};

// 'Parameters' type will return an array of the parameters
type ParamsFromF1 = Parameters<typeof f1>;
type ParamsFromFunc = Parameters<(a: string, b: number) => void>;
const a: ParamsFromF1 = [{ a: 0, b: "" }];
const b: ParamsFromFunc = ["", 0];

/*  
Type 'ConstructorParameters'
We will create a class to use the type on it
*/
class Class {
  a = "";
  b = 0;

  constructor(a: string, b: number) {
    this.a = a;
    this.b = b;
  }
}

// This type will get the parameters out of the constructor function, similar to the 'Parameters' type
type TypeConstructorParameters = ConstructorParameters<typeof Class>;
// Correct
const constructorParamsVar: TypeConstructorParameters = ["", 0];
// Trying to pass different type of values will produce an error
const constructorParamsVarWithError: TypeConstructorParameters = ["", ""];

// 'ReturnType' will give us the return type of a function
type TypeReturn = ReturnType<typeof f1>;
// Correct
const typeReturnVar: TypeReturn = 0;
const typeReturnVarWithError: TypeReturn = "";

// 'InstanceType' constructs a type consisting of the instance type of a constructor function in Type.
type TypeInstance = InstanceType<typeof Class>;
// This is the correct way, if we try to change one of the variables types or add another variable we will get an error
const typeInstanceVar: TypeInstance = {
  a: "",
  b: 0
  // Uncomment 'c' will produce and error
  // c: {}
};

// 'ThisParameterType' will return us the type 'this' parameter in a function
function someFunc(this: Number, b: string) {
  return this.toString();
}

type ThisTypeParameter = ThisParameterType<typeof someFunc>;
const thisTypeParameterVar: ThisTypeParameter = 0;
const thisTypeParameterVarWithError: ThisTypeParameter = "";

/*
'OmitThisParameter' Is for omitting the 'this' type, if no 'this' exists then it is just a normal type
It creates a function type with the same return type
*/
type TypeOmitThisParameter = OmitThisParameter<typeof someFunc>;
// The created function will have the same
const omitThisParameterVar: TypeOmitThisParameter = () => "";
// This produces and error because of the wrong return type
const omitThisParameterVarWithError: TypeOmitThisParameter = () => 0;

// We can create generic types and pass defaults to them both with types and interfaces
type GenericType<T, U = string> = {
  a: T;
  b: U;
};
interface GenericInterface<T, U = string> {
  a: T;
  b: U;
}
// Here we will only pass one type
const genericVar1: GenericType<SmallInterface> = {
  a: {
    name: "",
    randomStuff: {},
    randomStuffRecord: {}
  },
  // Since we didn't pass a second type, the default type of 'b' will be string
  b: ""
};
// Override the second generic type
const genericVar2: GenericType<string, number> = {
  a: "",
  b: 0
};

// We can declare generic types by their usage, e.g:
const genericFunc = <D, M>(desc: {
  data: D;
  methods: M & ThisType<D & M>; // Type of 'this' in methods is D & M
}) => {
  const data = desc.data;
  const methods = desc.methods;
  return { ...data, ...methods } as D & M;
};

const genericVarFromFunc = genericFunc({
  data: { a: 0 },
  methods: {
    method() {
      return this.a; // 'this' is determined by the passed data argument
    }
  }
});
// Notice this variable has the properties noted in the data object
genericVarFromFunc.a;

// We can achieve many different types both with 'type' and 'interface'
type Type = {
  a: string;
};

interface Interface {
  a: string;
}

const fromType: Type = {
  a: ""
};
const fromInterface: Interface = {
  a: ""
};

// We can extend both types and interface to achieve the same result
type ExtendedType = SmallInterface &
  Type & {
    b: string;
  };

interface ExtendedInterface extends SmallInterface, Interface {
  b: string;
}

// Notice that the types are identical
const extendedFromType: ExtendedType = {
  a: "",
  b: "",
  name: "",
  randomStuff: {},
  randomStuffRecord: {}
};
const extendedFromInterface: ExtendedInterface = {
  a: "",
  b: "",
  name: "",
  randomStuff: {},
  randomStuffRecord: {}
};

// Examples
export interface User {
  name: string;
  id: string;
}

export type ApiCalls = {
  users: () => Promise<User[]>;
};

type A = {
  a: Record<TypeLiteralFromConstArray, ExtendedType>;
  b: SmallInterface["name"];
  c: Partial<SmallInterface>;
  // This is a function that returns a promise that is going to resolve into a 'User' type
  userApiCall: ApiCalls["users"];
  // We have 2 ways of defining arrays
  arr1: Array<User>;
  arr2: User[]; // Preferred
};

const a: A = {
  a: {
    ini: {
      name: "",
      randomStuff: {},
      randomStuffRecord: {},
      a: "",
      b: "",
      optionalProp: 0
    },
    mini: {
      name: "",
      randomStuff: {},
      randomStuffRecord: {},
      a: "",
      b: "",
      optionalProp: 0
    },
    miny: {
      name: "",
      randomStuff: {},
      randomStuffRecord: {},
      a: "",
      b: "",
      optionalProp: 0
    },
    moe: {
      name: "",
      randomStuff: {},
      randomStuffRecord: {},
      a: "",
      b: "",
      optionalProp: 0
    }
  },
  b: "name",
  c: {
    randomStuff: {}
  },
  userApiCall: async () => await [{ name: "", id: "" }],
  arr1: [{ name: "", id: "" }],
  arr2: [{ name: "", id: "" }]
};

export enum ApiRoutes {
  USERS = "/api/users"
}
