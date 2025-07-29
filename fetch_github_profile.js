const fetch = require('node-fetch');
const fs = require('fs');

const username = 'Glendson';

async function fetchGitHubProfile() {
  const profileUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

  try {
    const profileResponse = await fetch(profileUrl);
    const profileData = await profileResponse.json();

    const reposResponse = await fetch(reposUrl);
    const reposData = await reposResponse.json();

    // Map repos to portfolio format
    const portfolio = reposData.map(repo => ({
      name: repo.name,
      url: repo.html_url,
      github: true
    }));

    // Construct profile.json structure
    const profileJson = {
      name: profileData.name || username,
      photo: profileData.avatar_url || '',
      job: profileData.bio || '',
      location: profileData.location || '',
      phone: '', // GitHub API does not provide phone
      email: profileData.email || '',
      github: profileData.html_url || `https://github.com/${username}`,
      skills: {
        hardSkills: [], // You may want to fill this manually later
        softSkills: []
      },
      languages: [],
      portfolio: portfolio,
      professionalExperience: []
    };

    // Write to profile.json file
    fs.writeFileSync('data/profile.json', JSON.stringify(profileJson, null, 2));
    console.log('profile.json updated successfully.');
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
  }
}

fetchGitHubProfile();
