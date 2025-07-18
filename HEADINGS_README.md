# Headings Backend API

A complete backend API for managing section headings with full CRUD operations.

## Features

- ✅ **Create** new section headings
- ✅ **Read** headings by user and section
- ✅ **Update** existing headings
- ✅ **Delete** headings by ID or section
- ✅ **MongoDB** integration with Mongoose
- ✅ **Express.js** REST API
- ✅ **Validation** and error handling
- ✅ **User-specific** data management

## API Endpoints

### GET Endpoints

#### Get All Headings for User
```
GET /api-get-heading-data/:userId
```
Returns all headings for a specific user.

#### Get Heading by Section
```
GET /api-get-heading-by-section/:userId/:section
```
Returns heading for a specific section (service, portfolio, pricing, testimonial).

### POST Endpoints

#### Create New Heading
```
POST /api-create-heading/:userId
```
Creates a new heading for a section.

**Body:**
```json
{
  "section": "service",
  "heading": "Our Services",
  "description": "We provide amazing services",
  "item_ShowOnWebsite": true
}
```

### PUT Endpoints

#### Create or Update Heading
```
PUT /api-create-update/headings/:userId
```
Creates new heading or updates existing one based on section.

#### Update Heading by ID
```
PUT /api-create-update/headings/:userId/:headingId
```
Updates specific heading by its ID.

### DELETE Endpoints

#### Delete Heading by ID
```
DELETE /api-delete-heading/:userId/:headingId
```
Deletes a specific heading by its ID.

#### Delete Heading by Section
```
DELETE /api-delete-heading-by-section/:userId/:section
```
Deletes heading for a specific section.

#### Delete All Headings for User
```
DELETE /api-delete-all-headings/:userId
```
Deletes all headings for a specific user.

## Data Model

### Heading Schema
```javascript
{
  userId: String,           // Required - User identifier
  section: String,          // Required - Section name (service, portfolio, etc.)
  heading: String,          // Required - Main heading text
  description: String,      // Optional - Description text
  item_ShowOnWebsite: Boolean, // Optional - Show on website (default: true)
  isActive: Boolean,        // Optional - Active status (default: true)
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database
NODE_ENV=development
```

### 3. Database Setup
Make sure MongoDB is running and accessible.

### 4. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

## Frontend Integration

### ServiceHeading Component Usage
```javascript
import ServiceHeading from './components/HeadingSettinges/Pages/ServiceHeading'

function App() {
  const showSnackbar = (message) => {
    // Your snackbar/toast implementation
    console.log('Success:', message)
  }

  const showError = (message) => {
    // Your error notification implementation
    console.error('Error:', message)
  }

  return (
    <ServiceHeading 
      showSnackbar={showSnackbar}
      showError={showError}
    />
  )
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "userId": "user123",
    "section": "service",
    "heading": "Our Services",
    "description": "We provide amazing services",
    "item_ShowOnWebsite": true,
    "isActive": true,
    "createdAt": "2023-09-01T10:00:00.000Z",
    "updatedAt": "2023-09-01T10:00:00.000Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Supported Sections

- `service` - Service section heading
- `portfolio` - Portfolio section heading
- `pricing` - Pricing section heading
- `testimonial` - Testimonial section heading
- `hero` - Hero section heading
- `about` - About section heading
- `contact` - Contact section heading

## Features

### Auto-Create/Update
The API automatically handles create vs update logic:
- If heading exists for section → Updates existing
- If heading doesn't exist → Creates new

### Validation
- Required fields validation
- Section enum validation
- String length limits
- User-specific data isolation

### Performance
- Indexed queries for fast retrieval
- Compound indexes for user + section
- Efficient MongoDB operations

## Error Handling

The API includes comprehensive error handling:
- Database connection errors
- Validation errors
- Not found errors
- Duplicate entry errors
- Server errors

## Security

- Input validation and sanitization
- Rate limiting (with express-rate-limit)
- CORS configuration
- Helmet.js security headers

## Development

### File Structure
```
├── headings-api-example.js      # API routes
├── headings-model-example.js    # MongoDB model
├── headings-package.json        # Dependencies
├── HEADINGS_README.md          # This file
└── server.js                   # Main server file
```

### Adding New Sections
To add new sections, update the enum in the model:
```javascript
section: {
  type: String,
  required: true,
  enum: ['service', 'portfolio', 'pricing', 'testimonial', 'new-section'],
  default: 'service'
}
```

## License

MIT License - feel free to use in your projects! 