


// ========== UTILITY FUNCTIONS ==========
function goBack() {
    window.history.back();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Copied to clipboard!");
    });
}

// ========== DATA MANAGEMENT ==========
// Store all registered artists
let registeredArtists = JSON.parse(localStorage.getItem('registeredArtists')) || [
    {
        id: 1,
        name: "Stanslaus Michael",
        firstName: "Stanslaus",
        middleName: "Robert",
        lastName: "Michael",
        email: "stanslaus@gmail.com",
        password: "Pass1234",
        avatar: "https://via.placeholder.com/100x100/3333ff/ffffff?text=SM",
        phone: "0678920202",
        dob: "1990-05-15",
        category: "solo",
        genre: "bongo",
        status: "active",
        expiryDate: "2023-12-31",
        features: { gifts: true, analytics: true, notifications: true, uploads: true },
        passkey: "ART-2835-2023",
        plan: "professional",
        profileImage: "https://via.placeholder.com/100x100/3333ff/ffffff?text=SM"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        firstName: "Sarah",
        middleName: "Elizabeth",
        lastName: "Johnson",
        email: "sarahj@gmail.com",
        password: "Pass5678",
        avatar: "https://via.placeholder.com/100x100/ff00cc/ffffff?text=SJ",
        phone: "0712345678",
        dob: "1988-11-22",
        category: "solo",
        genre: "pop",
        status: "expiring",
        expiryDate: "2023-10-15",
        features: { gifts: true, analytics: true, notifications: false, uploads: true },
        passkey: "ART-4729-2023",
        plan: "standard",
        profileImage: "https://via.placeholder.com/100x100/ff00cc/ffffff?text=SJ"
    },
    {
        id: 3,
        name: "Bongo Star",
        firstName: "Rajab",
        middleName: "Abdul",
        lastName: "Mohamed",
        email: "bongostar@yahoo.com",
        password: "Pass9101",
        avatar: "https://via.placeholder.com/100x100/00ffcc/ffffff?text=BS",
        phone: "0654321098",
        dob: "1985-03-08",
        category: "band",
        genre: "bongo",
        status: "expired",
        expiryDate: "2023-09-01",
        features: { gifts: false, analytics: false, notifications: false, uploads: false },
        passkey: "ART-5820-2023",
        plan: "basic",
        profileImage: "https://via.placeholder.com/100x100/00ffcc/ffffff?text=BS"
    },
    {
        id: 4,
        name: "DJ Moto",
        firstName: "James",
        middleName: "William",
        lastName: "Brown",
        email: "djmoto@hotmail.com",
        password: "Pass7391",
        avatar: "https://via.placeholder.com/100x100/ff3366/ffffff?text=DJ",
        phone: "0789456123",
        dob: "1992-07-30",
        category: "dj",
        genre: "electronic",
        status: "inactive",
        expiryDate: "2024-01-20",
        features: { gifts: false, analytics: true, notifications: true, uploads: false },
        passkey: "ART-7391-2023",
        plan: "premium",
        profileImage: "https://via.placeholder.com/100x100/ff3366/ffffff?text=DJ"
    }
];

let deletedArtists = JSON.parse(localStorage.getItem('deletedArtists')) || [];

// Sample data for gift transactions
const giftTransactions = [
    {
        id: 1,
        fanEmail: "fan1@gmail.com",
        emoji: "🔥",
        uniqueCode: "KhJJ2835",
        value: "$10.00",
        phone: "0678920202",
        date: "2023-09-20",
        status: "completed"
    },
    {
        id: 2,
        fanEmail: "fan2@yahoo.com",
        emoji: "🎵",
        uniqueCode: "GhTT4729",
        value: "$5.00",
        phone: "0712345678",
        date: "2023-09-21",
        status: "pending"
    },
    {
        id: 3,
        fanEmail: "fan3@hotmail.com",
        emoji: "💎",
        uniqueCode: "LpMM5820",
        value: "$100.00",
        phone: "0654321098",
        date: "2023-09-19",
        status: "completed"
    },
    {
        id: 4,
        fanEmail: "fan4@gmail.com",
        emoji: "👑",
        uniqueCode: "RtFF7391",
        value: "$200.00",
        phone: "0789456123",
        date: "2023-09-22",
        status: "pending"
    }
];

// Emoji inventory with initial counts
let emojiInventory = JSON.parse(localStorage.getItem('emojiInventory')) || [
    { icon: "🎵", name: "Music Note", value: "5", count: 2 },
    { icon: "🔥", name: "Fire", value: "10", count: 6 },
    { icon: "⭐", name: "Star", value: "20", count: 7 },
    { icon: "🎤", name: "Microphone", value: "50", count: 4 },
    { icon: "💎", name: "Diamond", value: "100", count: 10 },
    { icon: "👑", name: "Crown", value: "200", count: 5 }
];

// Load artists into table when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadArtistTable();
});

function loadArtistTable() {
    const tbody = document.querySelector("#artist-records-table tbody");
    tbody.innerHTML = ''; // Clear existing rows
    
    registeredArtists.forEach(artist => {
        const row = document.createElement("tr");
        row.setAttribute('data-id', artist.id);

        row.innerHTML = `
            <td><img src="${artist.avatar}" width="30" height="30" style="border-radius:50%;"></td>
            <td>${artist.firstName} ${artist.middleName || ''} ${artist.lastName}</td>
            <td>${artist.name}</td>
            <td>${artist.email}</td>
            <td>${artist.password}</td>
            <td>${artist.phone}</td>
            <td>${artist.dob}</td>
            <td>${artist.category}</td>
            <td>${artist.genre}</td>
            <td>${artist.plan}</td>
            <td>${artist.expiryDate}</td>
            <td>${artist.passkey}</td>
            <td>
                <button class="table-action-btn btn-view" onclick="viewArtistDetails(${artist.id})">View</button>
                <button class="table-action-btn btn-delete" onclick="deleteArtistRecord(${artist.id})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}



function viewArtistDetails(artistId) {
    if (artistId === 'this') {
        showToast("Cannot view details for unsaved artist");
        return;
    }
    
    const artist = registeredArtists.find(a => a.id === artistId);
    if (artist) {
        displayArtistDetails(artist);
    }
}

function deleteArtistRecord(artistId) {
    if (artistId === 'this') {
        showToast("Cannot delete unsaved artist");
        return;
    }
    
    const artistIndex = registeredArtists.findIndex(a => a.id === artistId);
    if (artistIndex !== -1) {
        const artist = registeredArtists[artistIndex];
        
        // Move to deleted artists
        deletedArtists.push(artist);
        localStorage.setItem('deletedArtists', JSON.stringify(deletedArtists));
        
        // Remove from registered artists
        registeredArtists.splice(artistIndex, 1);
        localStorage.setItem('registeredArtists', JSON.stringify(registeredArtists));
        
        // Remove from table
        const row = document.querySelector(`#artist-records-table tr[data-id="${artistId}"]`);
        if (row) {
            row.remove();
        }
        
        showToast(`Deleted ${artist.name}'s record. You can restore it from deleted records.`);
    }
}

function searchArtist() {
    const searchTerm = document.getElementById('artist-info-search').value.toLowerCase();
    
    if (!searchTerm) {
        renderArtistRecordsTable();
        return;
    }
    
    // Filter artists based on search term
    const filteredArtists = registeredArtists.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm) || 
        artist.email.toLowerCase().includes(searchTerm) ||
        (artist.firstName && artist.firstName.toLowerCase().includes(searchTerm)) ||
        (artist.lastName && artist.lastName.toLowerCase().includes(searchTerm)) ||
        (artist.phone && artist.phone.includes(searchTerm))
    );
    
    if (filteredArtists.length > 0) {
        renderArtistRecordsTable(filteredArtists);
    } else {
        showToast("No artists found with that search term");
    }
}

function renderArtistRecordsTable(artistsToRender = null) {
    const tbody = document.querySelector("#artist-records-table tbody");
    tbody.innerHTML = '';
    
    const artists = artistsToRender || registeredArtists;
    
    if (artists.length === 0) {
        tbody.innerHTML = '<tr><td colspan="12" style="text-align: center; padding: 20px;">No artist records found</td></tr>';
        return;
    }
    
    artists.forEach(artist => {
        addArtistToTable(artist);
    });
}

function displayArtistDetails(artist) {
    const artistDetails = document.getElementById('artist-details');
    if (!artistDetails) return;

    const expiryDate = new Date(artist.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    // Determine status class and text
    let statusClass = '';
    let statusText = '';
    if (artist.status === 'active' && daysUntilExpiry <= 7 && daysUntilExpiry >= 0) {
        statusClass = 'status-expiring';
        statusText = 'Expiring Soon';
    } else if (artist.status === 'expired' || daysUntilExpiry < 0) {
        statusClass = 'status-expired';
        statusText = 'Expired';
    } else if (artist.status === 'inactive') {
        statusClass = 'status-inactive';
        statusText = 'Inactive';
    } else {
        statusClass = 'status-active';
        statusText = 'Active';
    }

    // Build artist details HTML
    artistDetails.innerHTML = `
        <div class="artist-profile-header">
            <img src="${artist.profileImage}" alt="${artist.name}" class="artist-profile-img">
            <div class="artist-profile-info">
                <div class="artist-profile-name">${artist.name}</div>
                <div class="artist-profile-email">${artist.email}</div>
                <span class="artist-profile-status ${statusClass}">${statusText}</span>
            </div>
        </div>

        <div class="artist-details-grid">
            <div class="details-group">
                <div class="details-label">Full Name</div>
                <div class="details-value">${artist.firstName} ${artist.middleName || ''} ${artist.lastName}</div>
            </div>

            <div class="details-group">
                <div class="details-label">Phone Number</div>
                <div class="details-value">${artist.phone}</div>
            </div>

            <div class="details-group">
                <div class="details-label">Date of Birth</div>
                <div class="details-value">${new Date(artist.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>

            <div class="details-group">
                <div class="details-label">Artist Category</div>
                <div class="details-value">${artist.category ? artist.category.charAt(0).toUpperCase() + artist.category.slice(1) : '-'}</div>
            </div>

            <div class="details-group">
                <div class="details-label">Genre</div>
                <div class="details-value">${artist.genre ? artist.genre.toUpperCase() : '-'}</div>
            </div>

            <div class="details-group">
                <div class="details-label">Subscription Plan</div>
                <div class="details-value">${artist.plan ? artist.plan.charAt(0).toUpperCase() + artist.plan.slice(1) : '-'}</div>
            </div>

            <div class="details-group">
                <div class="details-label">Account Expiry</div>
                <div class="details-value">${expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>

            <div class="details-group">
                <div class="details-label">Passkey</div>
                <div class="details-value">${artist.passkey || '-'}</div>
            </div>
        </div>

        <div class="artist-actions">
            <button class="action-btn btn-suspend" onclick="suspendArtist(${artist.id})">
                <i class="fas fa-pause"></i> Suspend Account
            </button>
            <button class="action-btn btn-remove" onclick="removeArtist(${artist.id})">
                <i class="fas fa-trash"></i> Remove from Platform
            </button>
        </div>
    `;

    artistDetails.style.display = 'block';
}

function suspendArtist(artistId) {
    const artist = registeredArtists.find(a => a.id === artistId);
    if (artist) {
        artist.status = 'inactive';
        artist.features = {
            gifts: false,
            analytics: false,
            notifications: false,
            uploads: false
        };
        localStorage.setItem('registeredArtists', JSON.stringify(registeredArtists));
        showToast(`Suspended ${artist.name}'s account. They can no longer use platform features.`);
    }
}

function removeArtist(artistId) {
    const artistIndex = registeredArtists.findIndex(a => a.id === artistId);
    if (artistIndex !== -1) {
        const artist = registeredArtists[artistIndex];
        
        // Move to deleted artists
        deletedArtists.push(artist);
        localStorage.setItem('deletedArtists', JSON.stringify(deletedArtists));
        
        // Remove from registered artists
        registeredArtists.splice(artistIndex, 1);
        localStorage.setItem('registeredArtists', JSON.stringify(registeredArtists));
        
        document.getElementById('artist-details').style.display = 'none';
        document.getElementById('artist-info-search').value = '';
        
        // Refresh the table
        renderArtistRecordsTable();
        
        showToast(`Removed ${artist.name} from the platform. Their content remains but they can no longer access the account.`);
    }
}

function renderArtists() {
    const artistsGrid = document.getElementById('artists-grid');
    artistsGrid.innerHTML = '';
    
    registeredArtists.forEach(artist => {
        const expiryDate = new Date(artist.expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        let statusClass = '';
        if (artist.status === 'active' && daysUntilExpiry <= 7) {
            statusClass = 'expiring';
        } else if (artist.status === 'expired' || daysUntilExpiry < 0) {
            statusClass = 'expired';
        } else {
            statusClass = artist.status;
        }
        
        const artistCard = document.createElement('div');
        artistCard.className = `artist-card ${statusClass}`;
        
        artistCard.innerHTML = `
            <div class="artist-header">
                <img src="${artist.avatar}" alt="${artist.name}" class="artist-avatar">
                <div>
                    <div class="artist-name">${artist.name}</div>
                    <div class="artist-email">${artist.email}</div>
                </div>
                <span class="artist-status status-${statusClass}">${statusClass.charAt(0).toUpperCase() + statusClass.slice(1)}</span>
            </div>
            
            <div class="artist-features">
                <div class="feature-item">
                    <div class="feature-status ${artist.features.gifts ? 'feature-enabled' : 'feature-disabled'}"></div>
                    <span>Gift Sending</span>
                </div>
                <div class="feature-item">
                    <div class="feature-status ${artist.features.analytics ? 'feature-enabled' : 'feature-disabled'}"></div>
                    <span>Song Analytics</span>
                </div>
                <div class="feature-item">
                    <div class="feature-status ${artist.features.notifications ? 'feature-enabled' : 'feature-disabled'}"></div>
                    <span>Notifications</span>
                </div>
                <div class="feature-item">
                    <div class="feature-status ${artist.features.uploads ? 'feature-enabled' : 'feature-disabled'}"></div>
                    <span>Track Uploads</span>
                </div>
            </div>
            
            <div class="artist-expiry">
                <div class="expiry-label">Account Expiry</div>
                <div class="expiry-date ${statusClass === 'expiring' ? 'expiry-expiring' : statusClass === 'expired' ? 'expiry-expired' : ''}">
                    ${expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    ${statusClass === 'expiring' ? ` (${daysUntilExpiry} days left)` : ''}
                    ${statusClass === 'expired' ? ' (Expired)' : ''}
                </div>
            </div>
            
            <div class="card-actions">
                ${artist.status !== 'active' ? `
                    <button class="card-btn btn-enable" onclick="enableArtist(${artist.id})">Enable</button>
                ` : `
                    <button class="card-btn btn-disable" onclick="disableArtist(${artist.id})">Disable</button>
                `}
                
                ${statusClass === 'expiring' || statusClass === 'expired' ? `
                    <button class="card-btn btn-notify" onclick="notifyArtist(${artist.id})">Notify</button>
                ` : ''}
                
                <button class="card-btn btn-reset" onclick="resetPasskey(${artist.id})">Reset Passkey</button>
            </div>
        `;
        
        artistsGrid.appendChild(artistCard);
    });
}

function enableArtist(artistId) {
    const artist = registeredArtists.find(a => a.id === artistId);
    if (artist) {
        artist.status = 'active';
        artist.features = {
            gifts: true,
            analytics: true,
            notifications: true,
            uploads: true
        };
        localStorage.setItem('registeredArtists', JSON.stringify(registeredArtists));
        renderArtists();
        showToast(`Enabled ${artist.name}'s account`);
    }
}

function disableArtist(artistId) {
    const artist = registeredArtists.find(a => a.id === artistId);
    if (artist) {
        artist.status = 'inactive';
        artist.features = {
            gifts: false,
            analytics: false,
            notifications: false,
            uploads: false
        };
        localStorage.setItem('registeredArtists', JSON.stringify(registeredArtists));
        renderArtists();
        showToast(`Disabled ${artist.name}'s account`);
    }
}

function notifyArtist(artistId) {
    const artist = registeredArtists.find(a => a.id === artistId);
    if (artist) {
        showToast(`Notification sent to ${artist.name}`);
    }
}

function resetPasskey(artistId) {
    const artist = registeredArtists.find(a => a.id === artistId);
    if (artist) {
        const newPasskey = `ART-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
        artist.passkey = newPasskey;
        localStorage.setItem('registeredArtists', JSON.stringify(registeredArtists));
        showToast(`Passkey reset for ${artist.name}. New passkey: ${newPasskey}`);
    }
}

// ========== GIFT TRANSACTION MANAGEMENT ==========
function renderGiftTransactions() {
    const transactionsBody = document.getElementById('transactions-body');
    transactionsBody.innerHTML = '';
    
    giftTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${transaction.fanEmail}</td>
            <td class="emoji-cell">${transaction.emoji}</td>
            <td>${transaction.uniqueCode}</td>
            <td>${transaction.value}</td>
            <td>${transaction.phone}</td>
            <td>${transaction.date}</td>
            <td class="status-cell">
                <div class="status-dot status-${transaction.status}"></div>
                ${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </td>
            <td class="action-cell">
                ${transaction.status === 'pending' ? `
                    <button class="table-btn btn-approve" onclick="approveTransaction(${transaction.id})">Approve</button>
                    <button class="table-btn btn-reject" onclick="rejectTransaction(${transaction.id})">Reject</button>
                ` : 'Completed'}
            </td>
        `;
        
        transactionsBody.appendChild(row);
    });
}

function approveTransaction(transactionId) {
    const transaction = giftTransactions.find(t => t.id === transactionId);
    if (transaction) {
        transaction.status = 'completed';
        renderGiftTransactions();
        showToast(`Transaction ${transaction.uniqueCode} approved`);
    }
}

function rejectTransaction(transactionId) {
    const transaction = giftTransactions.find(t => t.id === transactionId);
    if (transaction) {
        giftTransactions.splice(giftTransactions.indexOf(transaction), 1);
        renderGiftTransactions();
        showToast(`Transaction ${transaction.uniqueCode} rejected`);
    }
}

// ========== EMOJI INVENTORY MANAGEMENT ==========
function renderEmojiInventory() {
    const emojiGrid = document.getElementById('emoji-grid');
    if (!emojiGrid) return;
    
    emojiGrid.innerHTML = '';
    
    emojiInventory.forEach((emoji, index) => {
        const emojiCard = document.createElement('div');
        emojiCard.className = 'emoji-card';
        
        emojiCard.innerHTML = `
            <div class="emoji-icon">${emoji.icon}</div>
            <div class="emoji-details">
                <div class="emoji-name">${emoji.name}</div>
                <div class="emoji-value">Value: ${emoji.value}</div>
                <div class="emoji-count">Quantity: ${emoji.count}</div>
            </div>
            <div class="emoji-actions">
                <button class="emoji-btn btn-add" onclick="changeEmojiCount(${index}, 1)">+</button>
                <button class="emoji-btn btn-remove" onclick="changeEmojiCount(${index}, -1)">-</button>
                <button class="emoji-btn btn-send" onclick="sendEmojisToArtist(${index})">Send</button>
            </div>
        `;
        
        emojiGrid.appendChild(emojiCard);
    });
}

function changeEmojiCount(index, change) {
    if (emojiInventory[index].count + change >= 0) {
        emojiInventory[index].count += change;
        localStorage.setItem('emojiInventory', JSON.stringify(emojiInventory));
        renderEmojiInventory();
        showToast(`Updated ${emojiInventory[index].name} quantity`);
    }
}








// ========== EMOJI INVENTORY MANAGEMENT ==========
let currentEmojiIndex = null;

function sendEmojisToArtist(emojiIndex) {
    currentEmojiIndex = emojiIndex;
    const emoji = emojiInventory[emojiIndex];
    
    // Populate artist select dropdown
    const artistSelect = document.getElementById('modal-artist-select');
    artistSelect.innerHTML = '<option value="">Select an artist</option>';
    
    registeredArtists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist.id;
        option.textContent = `${artist.name} (${artist.email})`;
        artistSelect.appendChild(option);
    });
    
    // Set max quantity
    const quantityInput = document.getElementById('modal-emoji-quantity');
    quantityInput.max = emoji.count;
    quantityInput.value = 1;
    
    // Show modal
    document.getElementById('artist-select-modal').style.display = 'flex';
}

function closeArtistModal() {
    document.getElementById('artist-select-modal').style.display = 'none';
    currentEmojiIndex = null;
}

function confirmEmojiSend() {
    const artistId = document.getElementById('modal-artist-select').value;
    const quantity = parseInt(document.getElementById('modal-emoji-quantity').value);
    
    if (!artistId || !quantity || quantity <= 0) {
        showToast("Please select an artist and valid quantity");
        return;
    }
    
    const artist = registeredArtists.find(a => a.id == artistId);
    const emoji = emojiInventory[currentEmojiIndex];
    
    if (quantity > emoji.count) {
        showToast(`Not enough ${emoji.name} emojis available`);
        return;
    }
    
    // Show confirmation modal
    document.getElementById('confirm-message').textContent = 
        `Send ${quantity} ${emoji.icon} ${emoji.name} to ${artist.name}?`;
    document.getElementById('artist-select-modal').style.display = 'none';
    document.getElementById('confirm-modal').style.display = 'flex';
}

function closeConfirmModal() {
    document.getElementById('confirm-modal').style.display = 'none';
    currentEmojiIndex = null;
}

function finalizeEmojiSend() {
    const artistId = document.getElementById('modal-artist-select').value;
    const quantity = parseInt(document.getElementById('modal-emoji-quantity').value);
    
    const artist = registeredArtists.find(a => a.id == artistId);
    const emoji = emojiInventory[currentEmojiIndex];
    
    // Deduct from inventory
    emojiInventory[currentEmojiIndex].count -= quantity;
    localStorage.setItem('emojiInventory', JSON.stringify(emojiInventory));
    
    // Show confirmation
    showToast(`Sent ${quantity} ${emoji.icon} ${emoji.name} to ${artist.name}`);
    
    // Close modal and refresh
    closeConfirmModal();
    renderEmojiInventory();
}

function changeEmojiCount(index, change) {
    if (emojiInventory[index].count + change >= 0) {
        emojiInventory[index].count += change;
        localStorage.setItem('emojiInventory', JSON.stringify(emojiInventory));
        renderEmojiInventory();
        showToast(`Updated ${emojiInventory[index].name} quantity`);
    }
}















// ========== SUBSCRIPTION MANAGEMENT ==========
function extendSubscription(artistId) {
    const artist = registeredArtists.find(a => a.id === artistId);
    if (artist) {
        const extension = prompt(`Extend subscription for ${artist.name}. Enter number of months:`);
        if (extension && !isNaN(extension) && extension > 0) {
            const expiryDate = new Date(artist.expiryDate);
            expiryDate.setMonth(expiryDate.getMonth() + parseInt(extension));
            artist.expiryDate = expiryDate.toISOString().split('T')[0];
            localStorage.setItem('registeredArtists', JSON.stringify(registeredArtists));
            
            if (artist.status === 'expired' || artist.status === 'inactive') {
                artist.status = 'active';
                artist.features = {
                    gifts: true,
                    analytics: true,
                    notifications: true,
                    uploads: true
                };
            }
            
            renderArtists();
            showToast(`Extended ${artist.name}'s subscription by ${extension} months`);
        }
    }
}

// ========== UI MANAGEMENT ==========
function removeFile(type) {
    const fileInfo = document.getElementById(`${type}-file-info`);
    fileInfo.style.display = 'none';
}

// ========== FILTER AND SEARCH FUNCTIONALITY ==========
function setupFilters() {
    // Artist management filters
    const statusFilter = document.getElementById('status-filter');
    const featureFilter = document.getElementById('feature-filter');
    const artistSearch = document.getElementById('artist-search');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterArtists);
    }
    if (featureFilter) {
        featureFilter.addEventListener('change', filterArtists);
    }
    if (artistSearch) {
        artistSearch.addEventListener('input', filterArtists);
    }
    
    // Gift transaction filters
    const dateFilter = document.getElementById('date-filter');
    const statusFilterGift = document.getElementById('status-filter-gift');
    const giftSearch = document.getElementById('gift-search');
    
    if (dateFilter) {
        dateFilter.addEventListener('change', filterGiftTransactions);
    }
    if (statusFilterGift) {
        statusFilterGift.addEventListener('change', filterGiftTransactions);
    }
    if (giftSearch) {
        giftSearch.addEventListener('input', filterGiftTransactions);
    }
}

function filterArtists() {
    const statusFilter = document.getElementById('status-filter');
    const featureFilter = document.getElementById('feature-filter');
    const artistSearch = document.getElementById('artist-search');
    
    const statusValue = statusFilter ? statusFilter.value : 'all';
    const featureValue = featureFilter ? featureFilter.value : 'all';
    const searchValue = artistSearch ? artistSearch.value.toLowerCase() : '';
    
    let filteredArtists = registeredArtists;
    
    // Filter by status
    if (statusValue !== 'all') {
        filteredArtists = filteredArtists.filter(artist => artist.status === statusValue);
    }
    
    // Filter by feature
    if (featureValue !== 'all') {
        filteredArtists = filteredArtists.filter(artist => artist.features[featureValue]);
    }
    
    // Filter by search term
    if (searchValue) {
        filteredArtists = filteredArtists.filter(artist => 
            artist.name.toLowerCase().includes(searchValue) ||
            artist.email.toLowerCase().includes(searchValue) ||
            (artist.firstName && artist.firstName.toLowerCase().includes(searchValue)) ||
            (artist.lastName && artist.lastName.toLowerCase().includes(searchValue))
        );
    }
    
    // Re-render artists
    const artistsGrid = document.getElementById('artists-grid');
    artistsGrid.innerHTML = '';
    
    filteredArtists.forEach(artist => {
        const expiryDate = new Date(artist.expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        let statusClass = '';
        if (artist.status === 'active' && daysUntilExpiry <= 7) {
            statusClass = 'expiring';
        } else if (artist.status === 'expired' || daysUntilExpiry < 0) {
            statusClass = 'expired';
        } else {
            statusClass = artist.status;
        }
        
        const artistCard = document.createElement('div');
        artistCard.className = `artist-card ${statusClass}`;
        
        artistCard.innerHTML = `
            <div class="artist-header">
                <img src="${artist.avatar}" alt="${artist.name}" class="artist-avatar">
                <div>
                    <div class="artist-name">${artist.name}</div>
                    <div class="artist-email">${artist.email}</div>
                </div>
                <span class="artist-status status-${statusClass}">${statusClass.charAt(0).toUpperCase() + statusClass.slice(1)}</span>
            </div>
            
            <div class="artist-features">
                <div class="feature-item">
                    <div class="feature-status ${artist.features.gifts ? 'feature-enabled' : 'feature-disabled'}"></div>
                    <span>Gift Sending</span>
                </div>
                <div class="feature-item">
                    <div class="feature-status ${artist.features.analytics ? 'feature-enabled' : 'feature-disabled'}"></div>
                    <span>Song Analytics</span>
                </div>
                <div class="feature-item">
                    <div class="feature-status ${artist.features.notifications ? 'feature-enabled' : 'feature-disabled'}"></div>
                    <span>Notifications</span>
                </div>
                <div class="feature-item">
                    <div class="feature-status ${artist.features.uploads ? 'feature-enabled' : 'feature-disabled'}"></div>
                    <span>Track Uploads</span>
                </div>
            </div>
            
            <div class="artist-expiry">
                <div class="expiry-label">Account Expiry</div>
                <div class="expiry-date ${statusClass === 'expiring' ? 'expiry-expiring' : statusClass === 'expired' ? 'expiry-expired' : ''}">
                    ${expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    ${statusClass === 'expiring' ? ` (${daysUntilExpiry} days left)` : ''}
                    ${statusClass === 'expired' ? ' (Expired)' : ''}
                </div>
            </div>
            
            <div class="card-actions">
                ${artist.status !== 'active' ? `
                    <button class="card-btn btn-enable" onclick="enableArtist(${artist.id})">Enable</button>
                ` : `
                    <button class="card-btn btn-disable" onclick="disableArtist(${artist.id})">Disable</button>
                `}
                
                ${statusClass === 'expiring' || statusClass === 'expired' ? `
                    <button class="card-btn btn-notify" onclick="notifyArtist(${artist.id})">Notify</button>
                ` : ''}
                
                <button class="card-btn btn-reset" onclick="resetPasskey(${artist.id})">Reset Passkey</button>
                <button class="card-btn btn-extend" onclick="extendSubscription(${artist.id})">Extend Subscription</button>
            </div>
        `;
        
        artistsGrid.appendChild(artistCard);
    });
}

function filterGiftTransactions() {
    const dateFilter = document.getElementById('date-filter');
    const statusFilterGift = document.getElementById('status-filter-gift');
    const giftSearch = document.getElementById('gift-search');
    
    const dateValue = dateFilter ? dateFilter.value : 'all';
    const statusValue = statusFilterGift ? statusFilterGift.value : 'all';
    const searchValue = giftSearch ? giftSearch.value.toLowerCase() : '';
    
    let filteredTransactions = giftTransactions;
    
    // Filter by date
    if (dateValue !== 'all') {
        const today = new Date();
        filteredTransactions = filteredTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            
            switch(dateValue) {
                case 'today':
                    return transactionDate.toDateString() === today.toDateString();
                case 'week':
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return transactionDate >= oneWeekAgo;
                case 'month':
                    const oneMonthAgo = new Date();
                    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                    return transactionDate >= oneMonthAgo;
                default:
                    return true;
            }
        });
    }
    
    // Filter by status
    if (statusValue !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.status === statusValue);
    }
    
    // Filter by search term
    if (searchValue) {
        filteredTransactions = filteredTransactions.filter(transaction => 
            transaction.fanEmail.toLowerCase().includes(searchValue) ||
            transaction.uniqueCode.toLowerCase().includes(searchValue) ||
            transaction.phone.includes(searchValue)
        );
    }
    
    // Re-render transactions
    const transactionsBody = document.getElementById('transactions-body');
    transactionsBody.innerHTML = '';
    
    filteredTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${transaction.fanEmail}</td>
            <td class="emoji-cell">${transaction.emoji}</td>
            <td>${transaction.uniqueCode}</td>
            <td>${transaction.value}</td>
            <td>${transaction.phone}</td>
            <td>${transaction.date}</td>
            <td class="status-cell">
                <div class="status-dot status-${transaction.status}"></div>
                ${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </td>
            <td class="action-cell">
                ${transaction.status === 'pending' ? `
                    <button class="table-btn btn-approve" onclick="approveTransaction(${transaction.id})">Approve</button>
                    <button class="table-btn btn-reject" onclick="rejectTransaction(${transaction.id})">Reject</button>
                ` : 'Completed'}
            </td>
        `;
        
        transactionsBody.appendChild(row);
    });
}

// ========== INITIALIZATION ==========
function init() {
    // Load any existing artists from localStorage
    if (registeredArtists.length > 0) {
        renderArtistRecordsTable();
    }
    
    renderArtists();
    renderGiftTransactions();
    renderEmojiInventory();
    setupFilters();
    
    // Tab switching functionality
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(this.dataset.tab).classList.add('active');
            
            // If switching to artist info tab, refresh the table
            if (this.dataset.tab === 'artist-info') {
                renderArtistRecordsTable();
            }
            
            // If switching to gift activation tab, refresh emoji inventory
            if (this.dataset.tab === 'gift-activation') {
                renderEmojiInventory();
            }
        });
    });
    
    // File upload simulation
    document.getElementById('profile-upload').addEventListener('click', function() {
        const fileInfo = document.getElementById('profile-file-info');
        fileInfo.style.display = 'flex';
    });
}

// Run initialization when page loads
window.onload = init;