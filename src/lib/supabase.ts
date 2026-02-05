import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://fqvqrecuowovcszmqyhg.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJmMGRiY2JjLTAwYzgtNDlkMC1iYjNkLTAxMTI3ZmZmZDhiNiJ9.eyJwcm9qZWN0SWQiOiJmcXZxcmVjdW93b3Zjc3ptcXloZyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcwMjA5NzcwLCJleHAiOjIwODU1Njk3NzAsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.VJIFWLJMcUJhhGL9CMsIQR6OdP1o_cmbSWxFBRy-sKA';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };