'use client'

import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import { CreateProductProps, getAllProducts, ProductProps, updateProduct, UpdateProductProps } from '../../../../../../../components/api/product'
import { GeneralContext } from '../../../../../../../contextProviders/GeneralProvider'
import { FiImage, FiX, FiPlus, FiMinus, FiEdit2, FiSave } from 'react-icons/fi'
import Image from 'next/image'
import { calculatePercentagePrice, updateLocalUser } from '../../../../../../../components/utils'
import { ProductContext } from '../../../../../../../contextProviders/ProductContext'
import { categories } from '../../../../../../../components/data/categories'
import { shoeSizes, clotheSizes } from '../../../../../../../components/data/sizes'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const UpdateProductPage = () => {
  const { user, setUser } = useContext(GeneralContext)
  const { setProducts, Products } = useContext(ProductContext)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [existingProduct, setExistingProduct] = useState<ProductProps | null>(null)
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([])
  const [hasYard, setHasYard] = useState(false)
  const router = useRouter()
  
  const params = useParams()
  const productId = params?.productId?.toString()

  const [productToUpdate, setProductToUpdate] = useState<UpdateProductProps>({
    productId: productId,
    userId: user?._id,
    addedBy: user?.username,
    colors: [] as string[],
    imageFiles: [] as File[],
    imageUrls: [] as string[],
    productName: '',
    price: 0,
    condition: '',
    deliveryMethod: '',
    quantity: 1,
    shoeSizes: [] as string[],
    clotheSizes: [] as string[],
    unitCost: 1,
    category: '',
    description: '',
  })

  const findProduct = () => {
    const userProducts: ProductProps[] = user?.store?.items || []
    const productExists = userProducts?.find((p) => p._id === productId)
    if (productExists) {
      setExistingProduct(productExists)
      setExistingImages(productExists.imageUrls || [])
      
      setProductToUpdate({
        productId: productExists._id,
        userId: user._id,
        addedBy: user.username,
        imageUrls: productExists.imageUrls || [],
        colors: Array.isArray(productExists.colors) ? productExists.colors : [],
        productName: productExists.productName,
        imageFiles: Array.isArray(productExists.imageFiles) ? productExists.imageFiles : [],
        price: productExists.price || 0,
        condition: productExists.condition,
        deliveryMethod: productExists.deliveryMethod,
        quantity: productExists.quantity,
        shoeSizes: Array.isArray(productExists.shoeSizes) ? productExists.shoeSizes : [],
        clotheSizes: Array.isArray(productExists.clotheSizes) ? productExists.clotheSizes : [],
        unitCost: productExists.unitCost || 1,
        category: productExists.category,
        description: productExists.description,
      })
    }
  }

  useEffect(() => {
    findProduct()
  }, [productId])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProductToUpdate(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' || name === 'unitCost' ? Number(value) || 0 : value
    }))
  }

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setProductToUpdate(prev => {
      const newColors = checked
        ? [...prev.colors, value]
        : prev.colors.filter(color => color !== value)
      return { ...prev, colors: newColors }
    })
  }

  const handleShoeSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setProductToUpdate(prev => {
      const newSizes = checked
        ? [...prev.shoeSizes, value]
        : prev.shoeSizes.filter(size => size !== value)
      return { ...prev, shoeSizes: newSizes }
    })
  }

  const handleClotheSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setProductToUpdate(prev => {
      const newSizes = checked
        ? [...prev.clotheSizes, value]
        : prev.clotheSizes.filter(size => size !== value)
      return { ...prev, clotheSizes: newSizes }
    })
  }

  const handleUpdateProduct = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)
    setSubmitError(null)
    setSuccess('')

    try {
      if (!existingProduct) {
        throw new Error('Product not found')
      }

      if (!productToUpdate.productName || !productToUpdate.price || !productToUpdate.description) {
        throw new Error('Please fill in all required fields')
      }

      const formData = new FormData()

      formData.append('productId', existingProduct._id)
      formData.append('userId', user._id)

      // Append existing images that aren't marked for removal
      existingImages
        .filter(url => !imagesToRemove.includes(url))
        .forEach(url => {
          formData.append('existingImageUrls', url)
        })

      // Append images to remove
      imagesToRemove.forEach(url => {
        formData.append('imagesToRemove', url)
      })

      // Append product data
      formData.append('addedBy', productToUpdate.addedBy)
      formData.append('productName', productToUpdate.productName)
      formData.append('price', productToUpdate.price.toString())
      formData.append('unitCost', productToUpdate.unitCost.toString())
      formData.append('condition', productToUpdate.condition)
      formData.append('deliveryMethod', productToUpdate.deliveryMethod)
      formData.append('quantity', productToUpdate.quantity.toString())
      formData.append('category', productToUpdate.category)
      formData.append('description', productToUpdate.description)

      // Append arrays
      productToUpdate.colors.forEach(color => {
        formData.append('colors', color)
      })

      productToUpdate.shoeSizes.forEach(size => {
        formData.append('shoeSizes', size)
      })

      productToUpdate.clotheSizes.forEach(size => {
        formData.append('clotheSizes', size)
      })

      // Append new images
      imageFiles.forEach(file => {
        formData.append('images', file)
      })

      const response = await updateProduct(formData, user?._id)

      if (response.ok) {
        // Update local state with new images
        const updatedProduct = response.data.updatedProduct
        setExistingImages(updatedProduct?.imageUrls || [])
        
        // Reset image states
        setImagePreviews([])
        setImageFiles([])
        setImagesToRemove([])
        
        // Update global state
        const updatedProducts = await getAllProducts()
        if (updatedProducts?.length > 0) {
          setProducts(updatedProducts)
        }
        
        // Update user context
        updateLocalUser(response.data.updatedUser)
        setUser(response.data.updatedUser)
        
        setSuccess('Product updated successfully!')
        toast.success('Product updated successfully!')
        setIsEditing(false)
      } else {
        setSubmitError(response.error)
        window.location.href = '#updateproduct-top'
      }
    } catch (error) {
      console.error('Error updating product:', error)
      const errorMsg = error instanceof Error ? error.message : 'Failed to update product'
      setSubmitError(errorMsg)
      toast.error(errorMsg)
      window.location.href = '#updateproduct-top'
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const currentCount = imageFiles.length + existingImages.length - imagesToRemove.length
    const remainingSlots = 4 - currentCount
    
    if (remainingSlots <= 0) {
      toast.warn('Maximum 4 images allowed')
      return
    }

    const selectedFiles = Array.from(files).slice(0, remainingSlots)
    if (selectedFiles.length === 0) return

    const newImagePreviews: string[] = []
    const newImageFiles: File[] = []
    
    selectedFiles.forEach(file => {
      if (!file.type.match('image.*')) {
        toast.warn(`File ${file.name} is not an image`)
        return
      }

      newImageFiles.push(file)
      
      const reader = new FileReader()
      reader.onload = (loadEvent) => {
        if (loadEvent.target?.result) {
          newImagePreviews.push(loadEvent.target.result as string)
          
          if (newImagePreviews.length === selectedFiles.length) {
            setImagePreviews(prev => [...prev, ...newImagePreviews])
            setImageFiles(prev => [...prev, ...newImageFiles])
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number, isNewImage: boolean) => {
    if (isNewImage) {
      setImagePreviews(prev => prev.filter((_, i) => i !== index))
      setImageFiles(prev => prev.filter((_, i) => i !== index))
    } else {
      const imageToRemove = existingImages[index]
      setImagesToRemove(prev => [...prev, imageToRemove])
    }
  }

  const incrementUnitCost = () => {
    setProductToUpdate(prev => ({ ...prev, unitCost: Number(prev.unitCost) + 1 }))
  }

  const decrementUnitCost = () => {
    if (productToUpdate.unitCost > 1) {
      setProductToUpdate(prev => ({ ...prev, unitCost: Number(prev.unitCost) - 1 }))
    }
  }

  const restoreImage = (image: string) => {
    setImagesToRemove(prev => prev.filter(img => img !== image))
  }

  const incrementQuantity = () => {
    setProductToUpdate(prev => ({ ...prev, quantity: prev.quantity + 1 }))
  }

  const decrementQuantity = () => {
    if (productToUpdate.quantity > 1) {
      setProductToUpdate(prev => ({ ...prev, quantity: prev.quantity - 1 }))
    }
  }

  const availableColors = [
    'black',
    'white',
    'pink',
    'brown',
    'red',
    'blue',
    'yellow',
    'green',
    'silver'
  ]

  if (!existingProduct) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex justify-center items-center h-64">
        <p className="text-gray-500">Loading product information...</p>
      </div>
    )
  }

  // Filter out removed images
  const currentExistingImages = existingImages.filter(img => !imagesToRemove.includes(img))
  const allImages = [
    ...currentExistingImages.map((img, index) => ({
      src: img,
      isNew: false,
      originalIndex: index
    })),
    ...imagePreviews.map((img, index) => ({
      src: img,
      isNew: true,
      originalIndex: index
    }))
  ]

  const customerSalesIncome = () => {
    const commission = calculatePercentagePrice(Number(productToUpdate.price), 5)
    return Number(productToUpdate.price) - commission
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md" id='updateproduct-top'>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Updating product details...' : 'Update Product Details'}
        </h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md transition-colors"
            >
              <FiEdit2 /> Edit
            </button>
          ) : (
            <button 
              onClick={() => {
                setIsEditing(false)
                setImagePreviews([])
                setImageFiles([])
                setImagesToRemove([])
                findProduct()
              }}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md transition-colors"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={() => router.push('/dashboard/storepage')}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded-md transition-colors"
          >
            Back to Store
          </button>
        </div>
      </div>
      
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <form onSubmit={handleUpdateProduct} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Name *</label>
            <input
              value={productToUpdate.productName}
              placeholder='Enter product name'
              name='productName'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={!isEditing}
            />
          </div>

          {/* Product Price */}
          <div className="space-y-2">
             <label className="block text-sm font-medium text-gray-700">
              Price (₦) - 5% Elteema fee. You get ₦{customerSalesIncome()} after sales.
              </label>
            <input
              type="number"
              value={productToUpdate.price.toString()}
              placeholder='Enter price'
              name='price'
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={!isEditing}
            />
          </div>

                {/* Unit Cost */}
                    <div className="space-y-2">
                       <label className="flex gap-2 text-sm font-medium text-gray-700">Unit Cost * 
                          <p className='text-sm'>Your product cost ₦{productToUpdate.price} per {productToUpdate.unitCost} {hasYard ? 'yard' : 
                             `${productToUpdate.unitCost > 1 ? "items" : "item"}`}</p>
                        </label>
                      
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={decrementUnitCost}
                          className="p-2 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                          disabled={!isEditing}
                        >
                          <FiMinus size={16} />
                        </button>
                        <input
                          type="number"
                          value={productToUpdate.unitCost}
                          name='unitCost'
                          onChange={handleChange}
                          min="1"
                          className="w-16 px-4 py-2 border-t border-b border-gray-300 text-center focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={incrementUnitCost}
                          className="p-2 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                          disabled={!isEditing}
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>
                    </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={productToUpdate.category}
              name='category'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={!isEditing}
            >
              <option value=''>Select category</option>
              {categories?.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Delivery Method */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Delivery Method *</label>
            <select
              value={productToUpdate.deliveryMethod}
              name='deliveryMethod'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={!isEditing}
            >
              <option value=''>Select delivery method</option>
              <option value='elteema delivery' disabled={true}>Use Elteema Delivery</option>
              <option value='handle delivery myself'>Handle Delivery Myself</option>
              <option value='uber delivery'>Uber delivery</option>
            </select>
          </div>

          {/* Product Colors */}
          {productToUpdate.colors?.length > 0  && <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Available Colors</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableColors.map(color => (
                <label key={color} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={color}
                    checked={productToUpdate.colors.includes(color)}
                    onChange={handleColorChange}
                    className="rounded text-green-600 focus:ring-green-500"
                    disabled={!isEditing}
                  />
                  <span className={!isEditing ? 'text-gray-500' : ''}>{color}</span>
                </label>
              ))}
            </div>
          </div>}

          {/* Product Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              value={productToUpdate.description}
              placeholder='Describe your product in detail'
              name='description'
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={!isEditing}
            />
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="flex gap-2 text-sm font-medium text-gray-700">
              Quantity *
              <p className='text-xs'>How many of this product do you have?</p>
            </label>
            
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementQuantity}
                className={`p-2 border border-gray-300 rounded-l-md ${!isEditing ? 'bg-gray-100' : 'bg-gray-100 hover:bg-gray-200'}`}
                disabled={productToUpdate.quantity <= 1 || !isEditing}
              >
                <FiMinus size={16} />
              </button>
              <input
                type="number"
                value={productToUpdate.quantity}
                name='quantity'
                onChange={handleChange}
                min="1"
                className="w-16 px-4 py-2 border-t border-b border-gray-300 text-center focus:outline-none"
                disabled={!isEditing}
              />
              <button
                type="button"
                onClick={incrementQuantity}
                className={`p-2 border border-gray-300 rounded-r-md ${!isEditing ? 'bg-gray-100' : 'bg-gray-100 hover:bg-gray-200'}`}
                disabled={!isEditing}
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

          {/* Condition */}
          {productToUpdate.condition !== '' && <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Condition *</label>
            <select
              value={productToUpdate.condition}
              name='condition'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={!isEditing}
            >
              <option value=''>Select condition</option>
              <option value='new'>New</option>
              <option value='used'>Used</option>
              <option value='refurbished'>Refurbished</option>
            </select>
          </div>}

          {/* Shoe Sizes */}
          {productToUpdate.shoeSizes?.length > 0 && <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Available Sizes</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {shoeSizes.map((size, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={size.value}
                    checked={productToUpdate.shoeSizes.includes(size.value)}
                    onChange={handleShoeSizeChange}
                    className="rounded text-green-600 focus:ring-green-500"
                    disabled={!isEditing}
                  />
                  <span className={!isEditing ? 'text-gray-500' : ''}>{size.text}</span>
                </label>
              ))}
            </div>
          </div>}

             {/* Clothe Sizes */}
          {productToUpdate.clotheSizes?.length > 0 &&<div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Available Sizes</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {clotheSizes.map((size, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={size}
                    checked={productToUpdate.shoeSizes.includes(size)}
                    onChange={handleClotheSizeChange}
                    className="rounded text-green-600 focus:ring-green-500"
                    disabled={!isEditing}
                  />
                  <span className={!isEditing ? 'text-gray-500' : ''}>{size}</span>
                </label>
              ))}
            </div>
          </div>}

          {/* Image Upload */}
          {isEditing && (
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Add New Images (Optional)</label>
              <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors">
                <FiImage size={24} className="text-gray-400 mr-2" />
                <span className="text-gray-600">Click to upload images</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">
                {allImages.length > 0 
                  ? `${allImages.length} image(s) (max 4)` 
                  : 'Upload up to 4 images (JPEG, PNG)'}
              </p>
            </div>
          )}
        </div>

        {/* Image Previews */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
          {allImages.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-square group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Image
                src={image.src}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
              
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => removeImage(image.originalIndex, image.isNew)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    aria-label="Remove image"
                  >
                    <FiX size={16} className="stroke-2" />
                  </button>
                </div>
              )}
              
              <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                {index + 1}/{allImages.length}
              </span>
            </div>
          ))}
        </div>

        {/* Removed Images Section (for undo) */}
        {isEditing && imagesToRemove.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Removed Images</h3>
            <div className="flex flex-wrap gap-2">
              {imagesToRemove.map((image, index) => (
                <div key={index} className="relative h-20 w-20">
                  <Image
                    src={image}
                    alt={`Removed image ${index + 1}`}
                    fill
                    className="object-cover rounded border-2 border-yellow-300 opacity-70"
                  />
                  <button
                    type="button"
                    onClick={() => restoreImage(image)}
                    className="absolute top-0 right-0 bg-green-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                    aria-label="Restore image"
                  >
                    <FiPlus size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        {isEditing && (
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Updating...' : (
                <>
                  <FiSave /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default UpdateProductPage