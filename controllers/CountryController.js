const { Country } = require('../models/Country')

exports.countries_view_get = async (req, res) => {
  try {

    const dbResponse = await Country.find()
    const countries = [...dbResponse.data, ...dbResponse]
    res.json(countries)
    //console.log(countries)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching theme countries')
  }
}
//add
exports.countries_add_post = (req, res) => {

  console.log('BOOK CREATE: ', req.body)
  // console.log(req.file)
  try {
    // const imageName = req.file.filename
    // let countryData = {
    //   ...req.body,
    //   image: imageName
    // }
    let country = new Country(req.body)
    country.save()
    res.send(country)
  } catch (error) {
    console.error('Error adding country:', error)
    res.status(500).send('Error adding country')
  }
}

//update
// exports.country_update_put = (req, res) => {
//   console.log(req.body.id);
//   Country.findByIdAndUpdate(req.body.id, req.body).then(() => {
//     // res.redirect("/country");
//   });
// };


//read
exports.country_index_get = (req, res) => {
  Country.find()
  .then(countries => {
      res.render("country/index", { countries: countries});
  })
  .catch(err => {
    console.log(err);
  });
};

//delete
exports.countries_delete = async (req, res) => {
  const { id } = req.params
  try {
    await Country.findByIdAndDelete(id)
    res.status(200).send('Country deleted successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error deleting country')
  }
}