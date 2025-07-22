export default (io) => {
    io.on('connection', (socket) => {
        // console.log('A user connected:', socket.id);

        socket.on('chat-message', (msgData) => {
            io.emit('chat-message', msgData);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

