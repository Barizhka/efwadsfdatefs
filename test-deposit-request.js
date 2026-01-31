// Тестовый запрос для проверки создания депозитного запроса
const SUPABASE_PROJECT_REF = 'pdkjhhfukjgdhxoaxrws';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBka2poaGZ1a2pnZGh4b2F4cndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MDk2MjYsImV4cCI6MjA3MzM4NTYyNn0.0iopIvcSc9POzm3FhvEWy4yBPhn9oMxWuPlPA1nM6H0';

async function testDepositRequest() {
    try {
        console.log('🧪 Тестирование создания депозитного запроса...');
        
        // Создаем тестовые данные
        const formData = new FormData();
        formData.append('amount', '5000');
        
        // Создаем тестовое изображение
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, 100, 100);
        
        // Конвертируем canvas в Blob
        const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, 'image/png');
        });
        
        const file = new File([blob], 'test-receipt.png', { type: 'image/png' });
        formData.append('receipt', file);
        
        // Заголовки авторизации (для тестирования используем Telegram ID)
        const headers = {
            'x-telegram-id': '7260860474', // Замените на ваш Telegram ID
            'Authorization': 'Bearer telegram_session_7260860474'
        };
        
        const response = await fetch(`https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/create-deposit-request`, {
            method: 'POST',
            headers,
            body: formData,
        });
        
        const result = await response.json();
        
        if (response.ok) {
            console.log('✅ Депозитный запрос успешно создан!');
            console.log('📝 Результат:', result);
            console.log('🤖 Проверьте админ бота @fgdghfdhbot на предмет получения уведомления');
        } else {
            console.error('❌ Ошибка создания депозитного запроса:');
            console.error('📄 Статус:', response.status);
            console.error('📝 Ответ:', result);
        }
        
    } catch (error) {
        console.error('❌ Неожиданная ошибка:', error);
    }
}

// Запускаем тест
testDepositRequest();