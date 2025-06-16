'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { UploadButton } from '@utils/uploadthing';

type TourFormProps = {
  actionType: 'create' | 'edit';
  initialData?: {
    nameENG: string;
    nameCRO: string;
    descriptionENG: string;
    descriptionCRO: string;
    latitude: string;
    longitude: string;
    address: string;
    pricePerPersonInEuro: string;
    maxGuests: string;
    durationInMinutes: string;
    startTime: string;
    imageUrl: string;
  };
  onSubmit: (data: any) => Promise<void>;
};

const TourForm = ({ actionType, initialData, onSubmit }: TourFormProps) => {
  const [tourData, setTourData] = useState({
    nameENG: '',
    nameCRO: '',
    descriptionENG: '',
    descriptionCRO: '',
    latitude: '',
    longitude: '',
    address: '',
    pricePerPersonInEuro: '',
    maxGuests: '',
    durationInMinutes: '',
    startTime: '',
    imageUrl: '',
    ...initialData,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (actionType === 'edit' && initialData) {
      setTourData(initialData);
    }
  }, [actionType, initialData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTourData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        ...tourData,
        latitude: +tourData.latitude,
        longitude: +tourData.longitude,
        pricePerPersonInEuro: +tourData.pricePerPersonInEuro,
        maxGuests: +tourData.maxGuests,
        durationInMinutes: +tourData.durationInMinutes,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {actionType === 'create' ? 'Create New Tour' : 'Edit Tour'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tour Name (ENG) */}
        <div>
          <label
            htmlFor="nameENG"
            className="block text-sm font-medium text-gray-700"
          >
            Tour Name (English)
          </label>
          <input
            type="text"
            id="nameENG"
            name="nameENG"
            value={tourData.nameENG}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border rounded w-full"
          />
        </div>

        {/* Tour Name (CRO) */}
        <div>
          <label
            htmlFor="nameCRO"
            className="block text-sm font-medium text-gray-700"
          >
            Tour Name (Croatian)
          </label>
          <input
            type="text"
            id="nameCRO"
            name="nameCRO"
            value={tourData.nameCRO}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border rounded w-full"
          />
        </div>

        {/* Description (ENG) */}
        <div>
          <label
            htmlFor="descriptionENG"
            className="block text-sm font-medium text-gray-700"
          >
            Description (English)
          </label>
          <textarea
            id="descriptionENG"
            name="descriptionENG"
            value={tourData.descriptionENG}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border rounded w-full"
            rows={4}
          />
        </div>

        {/* Description (CRO) */}
        <div>
          <label
            htmlFor="descriptionCRO"
            className="block text-sm font-medium text-gray-700"
          >
            Description (Croatian)
          </label>
          <textarea
            id="descriptionCRO"
            name="descriptionCRO"
            value={tourData.descriptionCRO}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border rounded w-full"
            rows={4}
          />
        </div>

        {/* Latitude and Longitude */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={tourData.latitude}
              onChange={handleInputChange}
              required
              className="py-2 px-4 border rounded w-full"
              min={-90}
              max={90}
              step="any"
            />
          </div>
          <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={tourData.longitude}
              onChange={handleInputChange}
              required
              className="py-2 px-4 border rounded w-full"
              min={-180}
              max={180}
              step="any"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={tourData.address}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border rounded w-full"
          />
        </div>

        {/* Price & Max Guests */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="pricePerPersonInEuro"
              className="block text-sm font-medium text-gray-700"
            >
              Price per Person (in Euro)
            </label>
            <input
              type="number"
              id="pricePerPersonInEuro"
              name="pricePerPersonInEuro"
              value={tourData.pricePerPersonInEuro}
              onChange={handleInputChange}
              required
              className="py-2 px-4 border rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="maxGuests"
              className="block text-sm font-medium text-gray-700"
            >
              Max Guests
            </label>
            <input
              type="number"
              id="maxGuests"
              name="maxGuests"
              value={tourData.maxGuests}
              onChange={handleInputChange}
              required
              className="py-2 px-4 border rounded w-full"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="durationInMinutes"
            className="block text-sm font-medium text-gray-700"
          >
            Duration (in Minutes)
          </label>
          <input
            type="number"
            id="durationInMinutes"
            name="durationInMinutes"
            value={tourData.durationInMinutes}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border rounded w-full"
          />
        </div>

        {/* Start Time */}
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            type="text"
            id="startTime"
            name="startTime"
            value={tourData.startTime}
            onChange={handleInputChange}
            required
            className="py-2 px-4 border rounded w-full"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Tour Image
          </label>
          <UploadButton
            className="!items-start"
            endpoint="imageUploader"
            onClientUploadComplete={(res: { url: string }[]) => {
              setTourData(prev => ({
                ...prev,
                imageUrl: res[0].url,
              }));
            }}
          />
        </div>

        {/* Image Preview */}
        {tourData.imageUrl && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">
              Image Preview:
            </h3>
            <img
              src={tourData.imageUrl}
              alt="Image preview"
              className="mt-2 w-full max-w-xs object-cover"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 bg-blue-500 text-white rounded w-full disabled:bg-gray-300"
        >
          {loading
            ? actionType === 'create'
              ? 'Creating Tour...'
              : 'Saving Changes...'
            : actionType === 'create'
              ? 'Create Tour'
              : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default TourForm;
