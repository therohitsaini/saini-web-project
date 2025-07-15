// Data Upload API Collection
export const uploadDataToServer = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}api/upload-data`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, error: result.message || 'Upload failed' };
        }
    } catch (error) {
        return { success: false, error: 'Network error occurred' };
    }
};

export const fetchUploadedData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}api/get-uploaded-data`, {
            method: 'GET',
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true, data: result.data };
        } else {
            return { success: false, error: result.message || 'Fetch failed' };
        }
    } catch (error) {
        return { success: false, error: 'Network error occurred' };
    }
};

export const deleteUploadedData = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}api/delete-uploaded-data/${id}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, error: result.message || 'Delete failed' };
        }
    } catch (error) {
        return { success: false, error: 'Network error occurred' };
    }
};

export const updateUploadedData = async (id, formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}api/update-uploaded-data/${id}`, {
            method: 'PUT',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, error: result.message || 'Update failed' };
        }
    } catch (error) {
        return { success: false, error: 'Network error occurred' };
    }
}; 