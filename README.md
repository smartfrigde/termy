# Termy
Termy jest wieloplatformowym narzędziem, dostępnym głównie w przeglądarkach, a także jako aplikacja na systemy Windows, macOS, Linux oraz urządzenia mobilne. Główne cele aplikacji to:

## Główna funkcjonalność

### 1. Zarządzanie połączeniami SSH:
* Dodawanie, edycja i usuwanie serwerów SSH.
* Szybkie łączenie się z serwerami.
* Obsługa wielu profili/tożsamości dla różnych konfiguracji SSH.
* Udostępnianie innym zasobów za pomocą drużyn 
### 2. Synchronizacja danych:
* Przechowywanie listy serwerów w chmurze (szyfrowanie end-to-end).
* Synchronizacja kluczy GPG pomiędzy urządzeniami.
* Obsługa lokalnych kopii zapasowych dla użytkowników preferujących pracę offline.
### 3. Zarządzanie kluczami:
* Generowanie kluczy SSH i GPG bezpośrednio w aplikacji.
* Importowanie i eksportowanie kluczy.
* Automatyczne dodawanie kluczy do agentów SSH i GPG.
### 4. Bezpieczeństwo:
* Szyfrowanie danych użytkownika.
### 5. Interfejs użytkownika:
* Intuicyjny dashboard z listą serwerów.
* Tryb ciemny/jasny.
### 6. Dodatki (jak starczy czasu)
* Możliwość tunelowania poprzez SSH
* Wsparcie SFTP
* Uwierzytelnianie wieloskładnikowe (MFA).
* Obsługa kluczy U2F/FIDO2 dla bezpiecznych połączeń.


## Techstack

### Frontend:
- Typescript
- React Native (Web/Android/iOS)

### Backend:
- Laravel