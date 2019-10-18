import Fields, {Field} from "./Fields";
import IQueryBuilderOptions from "./IQueryBuilderOptions";

export default class Utils {
  public static resolveVariables(operations: IQueryBuilderOptions[]): any {
    let ret: any = {};

    for (const { variables } of operations) {
      ret = { ...ret, ...variables };
    }

    return ret;
  }

  public static queryFieldsMap(fields?: Fields): string {
    switch (true) {
      case typeof fields == 'string': return `${fields}`;
      case Array.isArray(fields): return (fields as Array<Field>).map(field =>
        `${this.queryFieldsMap(field)}`
      )
      .join(", ");
      case typeof fields == 'object':
        let fo = fields as object;
        return Object.keys(fo).map((field, index) => {
            return `${field} {${this.queryFieldsMap( Object.values(fo)[index])}}`
          })
          .join(", ");
    }
    return "";
  }

  // Variables map. eg: { "id": 1, "name": "Jon Doe" }
  public static queryVariablesMap(variables: any) {
    const variablesMapped: { [key: string]: unknown } = {};
    if (variables) {
      Object.keys(variables).map(key => {
        variablesMapped[key] =
          typeof variables[key] === "object"
            ? variables[key].value
            : variables[key];
      });
    }
    return variablesMapped;
  }

  public static queryDataType(variable: any) {
    let type = "String";

    const value = typeof variable === "object" ? variable.value : variable;

    if (variable.type !== undefined) {
      type = variable.type;
    } else {
      switch (typeof value) {
        case "object":
          type = "Object";
          break;

        case "boolean":
          type = "Boolean";
          break;

        case "number":
          type = value % 1 === 0 ? "Int" : "Float";
          break;
      }
    }

    if (typeof variable === "object" && variable.required) {
      type += "!";
    }

    return type;
  }
}
