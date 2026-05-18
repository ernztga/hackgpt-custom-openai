import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
});

// const response = await imagekit.files.upload({
//   file: fs.createReadStream("path/to/file"),
//   fileName: "file-name.jpg",
// });

// console.log(response);

export default imagekit;
