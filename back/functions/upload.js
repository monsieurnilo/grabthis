const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');

// module.exports.createBucket = async (event) => {
//   const bucketName = event.body.bucketName;

//   try {
//     await s3.createBucket({ Bucket: bucketName }).promise();
//     return { statusCode: 200, body: JSON.stringify({ message: 'Bucket created successfully' }) };
//   } catch (error) {
//     return { statusCode: 500, body: JSON.stringify({ message: 'Error creating bucket' }) };
//   }
// };

// module.exports.listBuckets = async () => {
//   try {
//     const data = await s3.listBuckets().promise();
//     return { statusCode: 200, body: JSON.stringify(data.Buckets) };
//   } catch (error) {
//     return { statusCode: 500, body: JSON.stringify({ message: 'Error listing buckets' }) };
//   }
// };

// module.exports.deleteBucket = async (event) => {
//   const bucketName = event.pathParameters.bucketName;

//   try {
//     await s3.deleteBucket({ Bucket: bucketName }).promise();
//     return { statusCode: 200, body: JSON.stringify({ message: 'Bucket deleted successfully' }) };
//   } catch (error) {
//     return { statusCode: 500, body: JSON.stringify({ message: 'Error deleting bucket' }) };
//   }
// };

module.exports.uploadImage = async (event) => {
  const imagePath = 'images/image.jpeg';
  let base64Image = null;
  try {
    // Lire le contenu de l'image
    const imageContent = fs.readFileSync(imagePath);

    // Convertir le contenu de l'image en base64
    base64Image = imageContent.toString('base64');

    // Maintenant, vous pouvez téléverser binaryImage vers S3 ou effectuer d'autres opérations avec l'image
  } catch (error) {
    console.error('Erreur lors de la lecture de l\'image :', error);
  }
  const bucketName = 'grabthisbucket'; // Remplacez par le nom de votre bucket

  try {
    const params = {
      Bucket: bucketName,
      Key: 'nom_de_votre_image.jpg', // Nom de votre image dans le bucket
      Body: Buffer.from(base64Image, 'base64'), // Convertir l'image en binaire
      ContentType: 'image/jpeg', // Spécifier le type de contenu de l'image
    };

    await s3.upload(params).promise();
    return { statusCode: 200, body: JSON.stringify({ message: 'Image uploaded successfully' }) };
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: JSON.stringify({ message: 'Error uploading image' }) };
  }
};


