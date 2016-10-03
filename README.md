# Faker Generator

## Install

```bash
npm install
```

## Generate file

Run

```bash
cd folder/to/save/file
faking -c <count_of_elements> -s <schema_in_json> <file_name>
```

### Schema
Schema is a json base on [Casual](https://www.npmjs.com/package/casual) library:

```json
{"key_name_for_final_json": "type_of_function_from_casual"}

// Example
{"complete_name": "name"}

{"gender": "random_element|[\"male\",\"female\"]"}
```
