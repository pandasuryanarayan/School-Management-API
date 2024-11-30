const School = require('../models/schoolModel');

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validate the input data
    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Add the school to the database
    await School.add(name, address, parseFloat(latitude), parseFloat(longitude));

    // Return a success message
    res.status(201).json({ message: 'School added successfully' });

  } catch (error) {
    // Return a 500 error if something goes wrong
    res.status(500).json({ message: 'Error adding school' });
  }
};

const listSchools = async (req, res) => {
  try {
    // Destructure latitude and longitude from query parameters and parse them as numbers
    const { latitude, longitude } = req.query;
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Validate the input to ensure both latitude and longitude are valid numbers
    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Fetch all schools from the database
    const [schools] = await School.getAll();

    // Ensure that all schools contain a name, latitude, and longitude
    if (!schools || schools.length === 0) {
      return res.status(404).json({ message: 'No schools found' });
    }

    // Sort schools based on proximity to the provided latitude and longitude
    const sortedSchools = schools
      .map(school => ({
        ...school,
        distance: Math.sqrt(
          Math.pow(school.latitude - lat, 2) + Math.pow(school.longitude - lon, 2)
        )
      }))
      .sort((a, b) => a.distance - b.distance) // Sort by ascending distance

      // Map and return the necessary fields (name, address, latitude, longitude)
      .map(({ NAME, address, latitude, longitude }) => ({
        NAME,
        address,
        latitude,
        longitude
      }));

    // Respond with the sorted list of schools
    res.status(200).json(sortedSchools);

  } catch (error) {
    // Return a 500 error if something goes wrong
    res.status(500).json({ message: 'Error fetching schools' });
  }
};

module.exports = { addSchool, listSchools };