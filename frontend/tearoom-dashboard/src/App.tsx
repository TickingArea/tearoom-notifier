import { Box, Button, TextField, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Main from "./Main";
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from "react";

interface PrivateRouteProps {
    element: JSX.Element;
};

let globalAuthenticated: boolean | undefined = undefined;
let globalEmail: string | undefined = undefined;

export function setAuthenticated(authenticated: boolean | undefined): void {
    globalAuthenticated = authenticated;
}

export function getAuthenticated(): boolean | undefined {
    return globalAuthenticated;
}

export function setEmail(email: string | undefined): void {
    globalEmail = email;
}

export function getEmail(): string | undefined {
    return globalEmail;
}

function PrivateRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        globalAuthenticated = isAuthenticated;
    }, [isAuthenticated]);

    function handleSubmit(e: any): void {
        e.preventDefault();
        if (!email.trim()) return;

        fetch('/api/v1/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
            .then(response => {
                if (response.status === 401) {
                    setIsAuthenticated(false);
                    alert('正しいメールアドレスを入力してください。');
                } else {
                    setIsAuthenticated(true);
                    globalEmail = email;
                }
            })
            .catch(e => console.error(e));
    }

    return isAuthenticated ? <Navigate to='/dashboard' /> : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: theme.spacing(3), borderRadius: theme.spacing(1), boxShadow: theme.shadows[5], width: 300 }}>
                <TextField sx={{ marginBottom: theme.spacing(2) }} label='Email' variant="outlined" fullWidth type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                <Button sx={{ marginTop: theme.spacing(2), width: '100%' }} variant="contained" color="primary" type="submit" disabled={!email}>Submit</Button>
            </form>
        </Box>
    );
}

function DashboardPrivateRoute({ element }: PrivateRouteProps) {
    return globalAuthenticated ? element : <Navigate to='/' />
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute />
    },
    {
        path: '/dashboard',
        element: <DashboardPrivateRoute element={<Main />} />
    }
])

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}