function deletePost(postId) {
    fetch(`/deleting/${postId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to delete post');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function toggleLike(postId) {
    const emptyHeartIcon = document.getElementById(`emptyHeart${postId}`);
    const filledHeartIcon = document.getElementById(`filledHeart${postId}`);

    emptyHeartIcon.classList.toggle('d-none');
    filledHeartIcon.classList.toggle('d-none');
}

