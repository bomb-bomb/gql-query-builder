/*
Defines an array of strings or objects to define query fields
@example ['id', 'name']
@example [{id: 1, name: 'Chuck'}]
 */
type Field = string | object
type Fields = Array<Field> | Field;

export Field;
export default Fields;
