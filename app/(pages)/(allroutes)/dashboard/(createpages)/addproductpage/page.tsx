'use client'

import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import {  createProduct, CreateProductProps, getAllProducts } from '../../../../../../components/api/product'
import { GeneralContext } from '../../../../../../contextProviders/GeneralProvider'
import { FiImage, FiX, FiPlus, FiMinus } from 'react-icons/fi'
import Image from 'next/image'
import { calculatePercentagePrice, updateLocalUser } from '../../../../../../components/utils'
import { ProductContext } from '../../../../../../contextProviders/ProductContext'
import { categories, clothingCategories, fabricAndTextileCategories, foodCategories, shoeCategories } from '../../../../../../components/data/categories'
import { shoeSizes, clotheSizes } from '../../../../../../components/data/sizes'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL



const AddProductPage = () => {
  const { user, setUser } = useContext(GeneralContext)
  const { setProducts, Products } = useContext(ProductContext)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState('')
  const [hasColor, setHasColor] = useState(false)
  const [hasCondition, setHasCondition] = useState(false)
   const [hasYard, setHasYard] = useState(false)
  const [hasClothingSize, setHasClothingSize] = useState(false)
  const [hasShoeSize, setHasShoeSize] = useState(false)
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('0')
 
 



  
  const [product, setProduct] = useState<CreateProductProps>({
    userId: user?._id,
    addedBy: user.username,
    unitCost: 1,
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
    category: '',
    description: '',
    
  })

  useEffect(()=>{

    const isFoundInFood = foodCategories.includes(product.category)
    const isFoundInClothing = clothingCategories.includes(product.category)
    const isFoundInShoes = shoeCategories.includes(product.category)
    const isFoundInFabric = fabricAndTextileCategories.includes(product.category)

  // Clothing
  
  if(isFoundInClothing){
    setHasClothingSize(true)
    setHasColor(true)
    setHasShoeSize(false)
    setHasYard(false)
    setHasCondition(true)
    
  }
 // food
  else if(isFoundInFood){
    setHasShoeSize(false)
    setHasColor(false)
    setHasClothingSize(false)
     setHasYard(false)
     setHasCondition(false)
  }// Shoe
  else if(isFoundInShoes){
    setHasShoeSize(true)
    setHasColor(true)
    setHasClothingSize(false)
     setHasYard(false)
     setHasCondition(true)
  }
 // Textile & fabric
  else if(isFoundInFabric){
    setHasYard(true)
     setHasColor(true)
     setHasShoeSize(false)
     setHasCondition(true)
  }else{
    setHasShoeSize(false)
    setHasColor(false)
    setHasClothingSize(false)
     setHasYard(false)
     setHasCondition(false)
  }

}, [product?.category])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) || '' : value
    }))
  }

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setProduct(prev => {
      const newColors = checked
        ? [...prev.colors, value]
        : prev.colors.filter(color => color !== value)
      return { ...prev, colors: newColors }
    })
  }

    const handleClotheSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setProduct(prev => {
      const newSizes = checked
        ? [...prev.clotheSizes, value]
        : prev.shoeSizes.filter(size => size !== value)
      return { ...prev, clotheSizes: newSizes }
    })
  }

      const handleShoeSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setProduct(prev => {
      const newSizes = checked
        ? [...prev.shoeSizes, value]
        : prev.clotheSizes.filter(size => size !== value)
      return { ...prev, shoeSizes: newSizes }
    })
  }

  
  const handleCreateProduct = async (e: FormEvent) => {
  e.preventDefault()
  setSubmitError('')
  setIsSubmitting(true)
  setSubmitError(null)
  setSuccess('')

  

  try {
    // Validate required fields
    if (!product.productName || !product.price || !product.description) {
      throw new Error('Please fill in all required fields')
    }

    if (imageFiles.length === 0) {
      throw new Error('Please upload at least one product image')
      window.location.href = '#nav-top'
    }

    // Create FormData instead of sending JSON
    const formData = new FormData()
    
    // Append all product data (except imageFiles)
    formData.append('userId', user?._id)
    formData.append('addedBy', product.addedBy)
    formData.append('unitCost', product.unitCost.toString())
    formData.append('productName', product.productName)
    formData.append('imageUrls', product.imageUrls.toString())
    formData.append('price', product.price?.toString())
    formData.append('condition', product.condition)
    formData.append('deliveryMethod', product.deliveryMethod)
    formData.append('quantity', product.quantity?.toString())
    formData.append('category', product.category)
    formData.append('description', product.description)
    
    
    // Append colors as array
    product.colors.forEach(color => {
      formData.append('colors', color)
    })

    // Append shoes sizes as array
    product.shoeSizes.forEach(size => {
      formData.append('shoeSizes', size)
    })

      // Append clothe sizes as array
    product.clotheSizes.forEach(size => {
      formData.append('clotheSizes', size)
    })
    
    
    // Append all image files
    imageFiles.forEach(file => {
      formData.append('images', file) // Must match Multer field name ('images')
    })
     
    const response: any = await createProduct(formData, user?._id)
    
    // We handle response
    if(response.ok === true){
      const updatedUser = response.data
      updateLocalUser(updatedUser)
      setUser(updatedUser)
      const updatedProducts = await getAllProducts()
      if(updatedProducts?.length > 0){
      setProducts(updatedProducts)
      }
      setSuccess(response.message)
      // Reset form
      setProduct({
        userId: '',
        addedBy: '',
        unitCost: 0,
        imageUrls: [],
        colors: [],
        imageFiles,
        productName: '',
        price: 0,
        condition: '',
        deliveryMethod: '',
        quantity: 1,
        shoeSizes: [],
        clotheSizes: [],
        category: '',
        description: '',
        
      })
      setImagePreviews([])
      setImageFiles([])
      window.location.href = '#nav-top'
    } else {
      setSubmitError(response.error)
      window.location.href = '#nav-top'
    }
  } catch (error) {
    console.error('Error creating product:', error)
    setSubmitError(error instanceof Error ? error.message : 'Failed to create product')
    window.location.href = '#nav-top'
  } finally {
    setIsSubmitting(false)
  }
}

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  // Clear previous selections if we want to replace all images
  // Or keep this to allow adding more images
  const currentCount = imageFiles.length;
  const remainingSlots = 4 - currentCount;
  
  if (remainingSlots <= 0) {
    alert('Maximum 4 images allowed');
    return;
  }

  const selectedFiles = Array.from(files).slice(0, remainingSlots);
  if (selectedFiles.length === 0) return;

  const newImagePreviews: string[] = [];
  const newImageFiles: File[] = [];
  
  selectedFiles.forEach(file => {
    // file type validation
    if (!file.type.match('image.*')) {
      alert(`File ${file.name} is not an image`);
      return;
    }

    // Add to files array
    newImageFiles.push(file);
    
    // Image preview
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      if (loadEvent.target?.result) {
        newImagePreviews.push(loadEvent.target.result as string);
        
        // We must Update state when all previews are ready
        if (newImagePreviews.length === selectedFiles.length) {
          setImagePreviews(prev => [...prev, ...newImagePreviews]);
          setImageFiles(prev => [...prev, ...newImageFiles]);
          setProduct(prev => ({
            ...prev,
            imageFiles: [...prev.imageFiles, ...newImageFiles]
          }));
        }
      }
    };
    reader.readAsDataURL(file);
  });
};

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setProduct(prev => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== index)
    }))
  }

  const incrementQuantity = () => {
    setProduct(prev => ({ ...prev, quantity: prev.quantity + 1 }))
  }

  const decrementQuantity = () => {
    if (product.quantity > 1) {
      setProduct(prev => ({ ...prev, quantity: prev.quantity - 1 }))
    }
  }


    const incrementUnitCost = () => {
    setProduct(prev => ({ ...prev, unitCost: prev.unitCost + 1 }))
  }

  const decrementUnitCost= () => {
    if (product.unitCost > 1) {
      setProduct(prev => ({ ...prev, unitCost: prev.unitCost - 1 }))
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
    'silver',
    'multicolor(color color)'
  ]

   const customerSalesIncome = ()=>{
     const commission = calculatePercentagePrice(Number(product.price), 5)
     const salesIncome = Number(product.price) - commission
     return salesIncome
  }

   

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {!success ? <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>:
      <div className='flex gap-2 pt-2 pb-4'>
        <span className='text-green-900 font-extrabold'>{success}</span>
         <a href='/dashboard/storepage'><button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white'>
            Back to store
          </button>
          </a>
        </div>
      }
      
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleCreateProduct} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Name *</label>
            <input
              value={product.productName}
              placeholder='Enter product name'
              name='productName'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Product Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Price (₦) - 5% Elteema fee. You get ₦{customerSalesIncome()} after sales.
              </label>
            <input
              type="number"
              value={product.price}
              placeholder='Enter price'
              name='price'
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

         

          {/* Categories */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Choose category</label>
            <select
              value={product.category}
              name='category'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value=''>Select category</option>
              {categories?.map((category, index)=><option key={index}>{category}</option>)}
            </select>
          </div>

               {/* Unit Cost */}
          <div className="space-y-2">
            <label className="flex gap-2 text-sm font-medium text-gray-700">Unit Cost * 
              <p className='text-sm'>Your product cost ₦{product.price} per {product.unitCost} {hasYard ? 'yard' : 
              `${product.unitCost > 1 ? "items" : "item"}`}</p>
            </label>
            
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementUnitCost}
                className="p-2 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                // disabled={product.unitCost === ''}
              >
                <FiMinus size={16} />
              </button>
              <input
                type="number"
                value={product.unitCost}
                name='unitCost'
                onChange={handleChange}
                min="1"
                className="w-16 px-4 py-2 border-t border-b border-gray-300 text-center focus:outline-none"
              />
              <button
                type="button"
                onClick={incrementUnitCost}
                className="p-2 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

                 {/* Delivery Method */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Delivery Method *</label>
            <select
              value={product.deliveryMethod}
              name='deliveryMethod'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value=''>Select delivery method</option>
              <option value='elteema delivery' disabled={true}>Use Elteema Delivery</option>
              <option value='handle delivery myself'>Handle Delivery Myself</option>
              <option value='uber delivery'>Uber delivery</option>
            </select>
          </div>

     

          {/* Product Colors */}
          {hasColor && <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Choose all the available colours you have for this product</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableColors.map(color => (
                <label key={color} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={color}
                    checked={product.colors.includes(color)}
                    onChange={handleColorChange}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>}

          {/* Product Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              value={product.description}
              placeholder='Describe your product in detail'
              name='description'
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="flex gap-2 text-sm font-medium text-gray-700">Number in stock * 
              <p className='text-sm'>How many of this product do you have?</p>
            </label>
            
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementQuantity}
                className="p-2 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                disabled={product.quantity <= 1}
              >
                <FiMinus size={16} />
              </button>
              <input
                type="number"
                value={product.quantity}
                name='quantity'
                onChange={handleChange}
                min="1"
                className="w-32 px-4 py-2 border-t border-b border-gray-300 text-center focus:outline-none"
              />
              <button
                type="button"
                onClick={incrementQuantity}
                className="p-2 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

          {/* Condition */}
          {hasCondition && <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Condition *</label>
            <select
              value={product.condition}
              name='condition'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value=''>Select condition</option>
              <option value='new'>New</option>
              <option value='used'>Used</option>
              <option value='refurbished'>Refurbished</option>
            </select>
          </div>}


    

            {/* Clothe Sizes */}
          {hasClothingSize && <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Choose all the available sizes you have for this product</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {clotheSizes.map((size, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={size}
                    checked={product.clotheSizes.includes(size)}
                    onChange={handleClotheSizeChange}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>}

   

            {/* Shoes Sizes */}
          {hasShoeSize && <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Choose all the available sizes you have for this product</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {shoeSizes.map((size, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={size.value}
                    checked={product.shoeSizes.includes(size.value)}
                    onChange={handleShoeSizeChange}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span>{size.text}</span>
                </label>
              ))}
            </div>
          </div>}

          {/* Image Upload */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Images *</label>
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
              {product.imageFiles.length > 0 
                ? `${product.imageFiles.length} image(s) selected (max 4)` 
                : 'Upload up to 4 images (JPEG, PNG)'}
            </p>
          </div>
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group rounded-md overflow-hidden border border-gray-200 h-40">
                <Image
                  src={preview}
                  alt={`Product preview ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProductPage