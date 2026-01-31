// Скрипт для тестирования webhook setup
const BOT_TOKEN = '8157780482:AAFwe44e5UM3vwgbR4RknRCu4b6qHfwHgT0';

// 1. Проверяем текущий статус webhook
fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`)
  .then(res => res.json())
  .then(data => {
    console.log('🔗 Current webhook:', data);
    
    // 2. Удаляем старый webhook
    return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drop_pending_updates: true })
    });
  })
  .then(res => res.json())
  .then(data => {
    console.log('🗑️ Delete webhook:', data);
    
    // 3. Устанавливаем новый webhook для Aiogram
    return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://pdkjhhfukjgdhxoaxrws.supabase.co/functions/v1/telegram-bot-aiogram',
        max_connections: 40,
        allowed_updates: ['message', 'callback_query'],
        drop_pending_updates: true
      })
    });
  })
  .then(res => res.json())
  .then(data => {
    console.log('✅ Set new webhook:', data);
    
    // 4. Проверяем результат
    return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
  })
  .then(res => res.json())
  .then(data => {
    console.log('🔍 Final webhook status:', data);
  })
  .catch(error => {
    console.error('❌ Error:', error);
  });