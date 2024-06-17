import {
    Create,
    List,
    Datagrid,
    SimpleForm,
    TextInput,
    TextField,
    SearchInput
  } from "react-admin";

const postFilters = [
    <SearchInput source="q" alwaysOn />
];

export const CategoryList = (props: any) => (
    <>
        <List disableAuthentication {...props} filters={postFilters}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
            </Datagrid>
        </List>
    </>
    );
    
export const CategoryCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
        <TextInput source="title" />
        </SimpleForm>
    </Create>
);