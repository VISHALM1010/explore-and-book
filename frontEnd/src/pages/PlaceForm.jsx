import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AccountNav from './AccountNav';

const preInput = (label, description) => (
    <>
        <label className="block text-gray-700 text-sm font-semibold mb-1">{label}</label>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
    </>
);

const PlaceForm = ({ handleCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [price, setPrice] = useState(100);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [redirect, setRedirect] = useState('');

    const handleAddPhotoByLink = async (e) => {
        e.preventDefault();
        try {
            const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
            setPhotos((prev) => [...prev, filename]);
            setPhotoLink('');
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    const uploadPhoto = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        try {
            const { data: filenames } = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPhotos((prev) => [...prev, ...filenames]);
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    const handlePerksChange = (e) => {
        const perk = e.target.value;
        setPerks((prev) =>
            prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPlace = {
            title,
            description,
            address,
            photos,
            perks,
            extraInfo,
            price,
            checkIn,
            checkOut,
        };
        try {
            await axios.post('/places', newPlace);
            setRedirect('/account/places');
        } catch (error) {
            console.error('Error saving place:', error);
        }
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    const removePhoto = (e, photoToRemove) => {
        e.preventDefault();
        setPhotos((prev) => prev.filter((photo) => photo !== photoToRemove));
    };

    const selectAsMainPhoto = (e, photoToSelect) => {
        e.preventDefault();
        const photosWithoutSelect = photos.filter((photo) => photo !== photoToSelect);
        setPhotos([photoToSelect, ...photosWithoutSelect]);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-xl rounded-lg">
            <AccountNav />

            <form onSubmit={handleSubmit} className="mt-6 bg-white rounded-lg p-8 space-y-8">
                <div>
                    {preInput('Title', 'Title for your place, should be short and catchy')}
                    <input
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title, e.g., My lovely apt"
                    />
                </div>

                <div>
                    {preInput('Description', 'Description of the place')}
                    <textarea
                        className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your place"
                    />
                </div>

                <div>
                    {preInput('Address', 'Address to your place')}
                    <input
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                    />
                </div>

                <div>
                    {preInput('Photos', 'Add photos of your place')}
                    <div className="flex items-center mt-2">
                        <input
                            className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            type="text"
                            placeholder="Add using a link ..."
                            value={photoLink}
                            onChange={(e) => setPhotoLink(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleAddPhotoByLink}
                            className="ml-2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            Add Photo
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {photos.length > 0 &&
                            photos.map((link, index) => (
                                <div key={index} className="relative h-32">
                                    <img
                                        className="rounded-xl object-cover w-full h-full"
                                        src={`http://localhost:3001/uploads/${link}`}
                                        alt="Uploaded"
                                    />
                                    <button
                                        onClick={(e) => removePhoto(e, link)}
                                        className="absolute bottom-1 right-1 text-white bg-black opacity-70 rounded-xl p-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => selectAsMainPhoto(e, link)}
                                        className="absolute bottom-1 left-1 text-white bg-black opacity-70 rounded-xl p-2"
                                    >
                                        {link === photos[0] ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 1 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 1 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            ))}
                        <label className="h-32 cursor-pointer flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                            <input
                                type="file"
                                className="hidden"
                                onChange={uploadPhoto}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            Upload
                        </label>
                    </div>
                </div>

                <div>
                    {preInput('Perks', 'Select all the perks of your place')}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {['wifi', 'parking', 'pool', 'air-conditioning', 'kitchen', 'gym', 'sports', 'breakfast', 'pets', 'washer', 'workspace'].map(
                            (perk) => (
                                <label
                                    key={perk}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        value={perk}
                                        checked={perks.includes(perk)}
                                        onChange={handlePerksChange}
                                        className="form-checkbox rounded text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 capitalize text-gray-700">
                                        {perk.replace('-', ' ')}
                                    </span>
                                </label>
                            )
                        )}
                    </div>
                </div>

                <div>
                    {preInput('Extra Info', 'House rules, etc')}
                    <textarea
                        className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={extraInfo}
                        onChange={(e) => setExtraInfo(e.target.value)}
                        placeholder="House rules, etc"
                    />
                </div>

                <div>
                    {preInput('Price per night', 'Add price')}
                    <input
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="100"
                    />
                </div>

                <div>
                    {preInput('Check In Time', 'Add check-in time')}
                    <input
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="time"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                </div>

                <div>
                    {preInput('Check Out Time', 'Add check-out time')}
                    <input
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="time"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PlaceForm;
