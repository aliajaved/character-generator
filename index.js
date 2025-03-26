 // Data
 const features = ['Hair', 'Eyes', 'Ears', 'Mouth', 'Background', 'Accessories'];
    
 const featureOptions = {
   Hair: [
     '/assets/customize-look-preview-icons-right-side/hair/hair-1.svg',
     '/assets/customize-look-preview-icons-right-side/hair/hair-2.svg',
     '/assets/customize-look-preview-icons-right-side/hair/hair-3.svg',
     '/assets/customize-look-preview-icons-right-side/hair/hair-4.svg',
     '/assets/customize-look-preview-icons-right-side/hair/hair-5.svg',
     '/assets/customize-look-preview-icons-right-side/hair/hair-6.svg'
   ],
   Eyes: [
     '/assets/customize-look-preview-icons-right-side/eyes/eyes-1.svg',
     '/assets/customize-look-preview-icons-right-side/eyes/eyes-2.svg',
     '/assets/customize-look-preview-icons-right-side/eyes/eyes-3.svg',
     '/assets/customize-look-preview-icons-right-side/eyes/eyes-4.svg',
     '/assets/customize-look-preview-icons-right-side/eyes/eyes-5.svg',
     '/assets/customize-look-preview-icons-right-side/eyes/eyes-6.svg'
   ],
   Ears: [
     '/assets/customize-look-preview-icons-right-side/ears/ears-1.svg',
     '/assets/customize-look-preview-icons-right-side/ears/ears-2.svg',
     '/assets/customize-look-preview-icons-right-side/ears/ears-3.svg',
     '/assets/customize-look-preview-icons-right-side/ears/ears-4.svg',
     '/assets/customize-look-preview-icons-right-side/ears/ears-5.svg',
     '/assets/customize-look-preview-icons-right-side/ears/ears-6.svg'
   ],
   Mouth: [
     '/assets/customize-look-preview-icons-right-side/mouth/mouth-1.svg',
     '/assets/customize-look-preview-icons-right-side/mouth/mouth-2.svg',
     '/assets/customize-look-preview-icons-right-side/mouth/mouth-3.svg',
     '/assets/customize-look-preview-icons-right-side/mouth/mouth-4.svg',
     '/assets/customize-look-preview-icons-right-side/mouth/mouth-5.svg',
     '/assets/customize-look-preview-icons-right-side/mouth/mouth-6.svg'
   ],
   Background: ['bg-gray-200', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500'],
   Accessories: [
     '/assets/customize-look-preview-icons-right-side/accessories/accessories-1.svg',
     '/assets/customize-look-preview-icons-right-side/accessories/accessories-2.svg',
     '/assets/customize-look-preview-icons-right-side/accessories/accessories-3.svg',
     '/assets/customize-look-preview-icons-right-side/accessories/accessories-4.svg',
     '/assets/customize-look-preview-icons-right-side/accessories/accessories-5.svg',
     '/assets/customize-look-preview-icons-right-side/accessories/accessories-6.svg'
   ]
 };
 
 // State
 let selectedFeature = null;
 let characterFeatures = {
   Hair: null,
   Eyes: null,
   Ears: null,
   Mouth: null,
   Background: 'bg-purple-500',
   Accessories: null
 };
 
 // DOM Elements
 const featureButtonsContainer = document.getElementById('feature-buttons');
 const featureOptionsContainer = document.getElementById('feature-options');
 const characterDisplay = document.getElementById('character-display');
 const randomButton = document.getElementById('random-button');
 const downloadButton = document.getElementById('download-button');
 
 // Initialize the app
 function init() {
   renderFeatureButtons();
   renderCharacter();
   
   // Event listeners
   randomButton.addEventListener('click', handleRandomGenerate);
   downloadButton.addEventListener('click', () => {
     alert('Download functionality would be implemented here');
   });
 }
 
 // Render feature buttons
 function renderFeatureButtons() {
   featureButtonsContainer.innerHTML = '';
   
   features.forEach(feature => {
     const button = document.createElement('button');
     button.className = `px-3 py-1 rounded mb-2 ${
       selectedFeature === feature 
         ? 'bg-blue-500 text-white' 
         : 'bg-gray-200 text-gray-700'
     }`;
     button.textContent = feature;
     button.addEventListener('click', () => handleFeatureSelect(feature));
     featureButtonsContainer.appendChild(button);
   });
 }
 
 // Render feature options
 function renderFeatureOptions() {
   featureOptionsContainer.innerHTML = '';
   
   if (!selectedFeature) {
     featureOptionsContainer.classList.add('hidden');
     return;
   }
   
   featureOptionsContainer.classList.remove('hidden');
   
   featureOptions[selectedFeature].forEach((option, index) => {
     const button = document.createElement('button');
     button.className = `h-20 ${
       selectedFeature === 'Background' 
         ? option 
         : 'bg-white border'
     } ${
       characterFeatures[selectedFeature] === option ? 'selected' : ''
     }`;
     
     if (selectedFeature !== 'Background') {
       const img = document.createElement('img');
       img.src = option;
       img.alt = `${selectedFeature} option ${index + 1}`;
       img.className = 'w-full h-full object-contain';
       button.appendChild(img);
     }
     
     button.addEventListener('click', () => handleOptionSelect(option));
     featureOptionsContainer.appendChild(button);
   });
 }
 
 // Render character with selected features
 function renderCharacter() {
   // Set background
   characterDisplay.className = `relative mb-4 ${characterFeatures.Background}`;
   
   // Clear existing feature overlays
   document.querySelectorAll('.feature-overlay').forEach(el => el.remove());
   
   // Add feature overlays
   Object.entries(characterFeatures).forEach(([feature, value]) => {
     if (!value || feature === 'Background') return;
     
     const img = document.createElement('img');
     img.src = value;
     img.alt = `${feature} option`;
     img.className = 'feature-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 z-20';
     characterDisplay.querySelector('div').appendChild(img);
   });
 }
 
 // Event handlers
 function handleFeatureSelect(feature) {
   selectedFeature = selectedFeature === feature ? null : feature;
   renderFeatureButtons();
   renderFeatureOptions();
 }
 
 function handleOptionSelect(option) {
   characterFeatures[selectedFeature] = option;
   selectedFeature = null;
   renderFeatureButtons();
   renderFeatureOptions();
   renderCharacter();
 }
 
 function handleRandomGenerate() {
   const randomizedFeatures = {};
   Object.keys(featureOptions).forEach(feature => {
     const options = featureOptions[feature];
     randomizedFeatures[feature] = options[Math.floor(Math.random() * options.length)];
   });
   characterFeatures = randomizedFeatures;
   selectedFeature = null;
   renderFeatureButtons();
   renderFeatureOptions();
   renderCharacter();
 }
 
 // Start the app
 init();