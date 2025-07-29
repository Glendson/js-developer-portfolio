
async function fetchProfileData() {
    const url = './data/profile.json';
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const profileData = await response.json()
        return profileData
    } catch (error) {
        console.error('Failed to fetch profile data:', error);
        return null;
    }
}
