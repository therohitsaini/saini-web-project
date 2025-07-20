import React, { useState, useEffect } from 'react';
import { Divider, TextField, Button, Chip, Box, Checkbox } from '@mui/material';
import GradientButton from '../../ReuseComponent/ReuseComponent';
import { showErrorToast, showSuccessToast } from '../../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable';
import { ToastContainer } from 'react-toastify';

function FooterCategory({ userID }) {
    const [categoryName, setCategoryName] = useState('');
    const [inputItem, setInputItem] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [getCategoryDataApies, setGetCategoryDataApies] = useState([])
    const [categoryId, setCategoryId] = useState()

    // useEffect(() => {
    //     if (getCategoryDataApies) {

    //     }
    // }, [categoryId, userID]);

    const loadCategoryData = async (userID) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/api-footer-get/${userID}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const result = await response.json()

            if (response.ok) {
                setGetCategoryDataApies(result.data)

                // Set categoryName as a string so it appears in the TextField
                if (result.data && result.data[0]) {
                    const categoryData = result.data[0];
                    setCategoryName(categoryData.categoryName || '');
                    setItems(categoryData.listItem || []);
                    setCategoryId(categoryData._id)
                    console.log('Data loaded into form:', {
                        categoryName: categoryData.categoryName,
                        items: categoryData.listItem
                    });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadCategoryData(userID)
    }, [])

    console.log("result___GET", getCategoryDataApies[0])

    const handleAddItem = () => {
        const trimmed = inputItem.trim();
        if (trimmed && !items.includes(trimmed)) {
            setItems([...items, trimmed]);
            setInputItem('');
        }
    };

    const handleDeleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userID) {
            alert("User ID is required!");
            return;
        }

        if (!categoryName || !categoryName.trim()) {
            alert("Category name is required!");
            return;
        }

        const payload = {
            categoryName: categoryName.trim(),
            listItem: items,
            userId: userID
        };
        console.log("Submitting payload:", payload);
        setLoading(true)
        const url = categoryId
            ? `${import.meta.env.VITE_BACK_END_URL}api-footer/api-footer-update/${categoryId}`
            : `${import.meta.env.VITE_BACK_END_URL}api-footer/api-footer/post`;

        const method = categoryId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': userID
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log('Submit response:', data);

            if (res.ok) {
                showSuccessToast(categoryId ? 'Category updated successfully!' : 'Category created!');
                setLoading(false)
                if (!categoryId) {
                    loadCategoryData()
                }
            } else {
                showErrorToast(`Error: ${data.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error('Request error:', error);
            showErrorToast('Server error');
        }
    };

    // if (loading) {
    //     return <div>Loading category data...</div>;
    // }

    return (
        <form
            onSubmit={handleSubmit}
            className="form-category border border-slate-400/20 p-5 w-[600px] flex flex-col gap-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
        >
            <ToastContainer />
            <h1 className="text-2xl font-bold">
                {categoryId ? 'Edit Footer Category' : 'Add Footer Category'}
            </h1>
            <Divider sx={{ mb: 1 }} />

            {/* Debug Info - Remove this later */}


            <TextField
                label="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                size="small"
                required
                sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        fontSize: '12px',
                        '& input': { fontSize: '14px' },
                        '&:hover fieldset': { borderColor: 'blue' },
                        '&.Mui-focused fieldset': { borderColor: 'blue' },
                    },
                }}
            />

            <TextField
                label="Add Item"
                value={inputItem}
                onChange={(e) => setInputItem(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddItem();
                    }
                }}
                size="small"
                sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        fontSize: '12px',
                        '& input': { fontSize: '14px' },
                        '&:hover fieldset': { borderColor: 'blue' },
                        '&.Mui-focused fieldset': { borderColor: 'blue' },
                    },
                }}
            />
            <div className='flex justify-end'>
                <Button
                    sx={{
                        textTransform: 'none',
                    }}
                    type="button" variant="outlined" onClick={handleAddItem}>
                    + Add Item
                </Button>
            </div>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {items.map((item, index) => (
                    <Chip
                        key={index}
                        label={item}
                        onDelete={() => handleDeleteItem(index)}
                        color="primary"
                        size="small"
                    />
                ))}
            </Box>
            <div className="flex items-center gap-2  sticky top-0 w-full ">
                <Checkbox
                    name='showOnWebsite'
                    defaultChecked
                    sx={{ m: 0, p: 0 }}
                    size="small"
                />
                <p className="text-[14px] text-slate-500 font-sans">
                    If you want to show this on the website
                </p>
            </div>
            <div className='flex justify-end'>
                <GradientButton
                    sx={{
                        textTransform: 'none',
                        minWidth: '200px',
                        backgroundImage: loading
                            ? 'none'
                            : 'linear-gradient(to right, #1e3a8a, #9333ea)',
                        backgroundColor: loading ? '#c2c2c2' : undefined,
                        color: 'white',
                        '&:hover': {
                            backgroundImage: loading
                                ? 'none'
                                : 'linear-gradient(to right, #1e40af, #7c3aed)',
                            backgroundColor: loading ? '#c2c2c2' : undefined,
                        },
                    }}
                    type="submit" variant="contained" loading={loading}>
                    {categoryId ? 'Update Category' : 'Save Category'}
                </GradientButton>
            </div>
        </form>
    );
}

export default FooterCategory;