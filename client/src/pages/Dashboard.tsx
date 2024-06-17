import { Card, CardContent, CardHeader } from "@mui/material";

export const Dashboard = () => (
    <Card>
        <CardHeader title="Welcome to the the react-admin meets genezio demo" />
        <CardContent>This react app uses Genezio as a data provider and authentication provider.</CardContent>
        <CardContent>The blog posts and the categories lists are accessible w/o needing any authentication.</CardContent>
        <CardContent>The categories list is paginated, can be filtered and sorted.</CardContent>
        <CardContent>You can change the data, create accounts, reset passwords, login and so on.</CardContent>
    </Card>
);
