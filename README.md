Autor: Sylwester Smoroński<br />

# Opis projektu

Aplikacja "Sklep z Książkami" to prosta aplikacja stworzona w React, umożliwiająca użytkownikom: <br />
• Przeglądanie książek i filtrowanie ich według tytułu oraz kategorii.<br />
• Dodawanie książek do koszyka i finalizowanie zamówień.<br />
• Logowanie i rejestrację użytkowników.<br />
• Przeglądanie historii zamówień po zalogowaniu.<br />
Aplikacja wykorzystuje React Context API i LocalStorage do przechowywania danych użytkownika oraz zamówień.

# Setup projektu

1. Zainstaluj zależności: npm install<br />
2. Uruchom projekt: npm start<br />

# Technologie i biblioteki

Projekt został zbudowany przy użyciu:<br />
• React (frontend)<br />
• React Router (nawigacja między stronami)<br />
• React Context API (zarządzanie stanem: logowanie, koszyk)<br />
• Bootstrap (stylizacja interfejsu)<br />
• LocalStorage (przechowywanie danych użytkownika i historii zamówień)<br />

## Podzieliłem komponenty na 3 foldery:

1. Components - Zawiera mniejsze, wielokrotnego użytku komponenty, które mogą być używane w różnych miejscach aplikacji:<br />
   o Navbar.js – Nawigacja dostępna na wszystkich stronach.<br />
   o Cart.js – Wyświetla zawartość koszyka i obsługuje usuwanie produktów(z koszyka).<br />
   o Login.js - Formularz logowania.<br />
   o Orders.js - Historia zamówień użytkownika.<br />
   o ProductDetail.js - Wyświetla szczegóły pojedynczej książki (strona z opisem, ceną itp.).<br />
   o Register.js - Formularz rejestracji nowego użytkownika.<br />
2. Context - Używane do przechowywania i manipulowania danymi na poziomie całej aplikacji.<br />
   o AuthContext.js - Zarządza danymi o zalogowanym użytkowniku (logowanie, rejestracja, wylogowanie).<br />
   o CartContext.js - Przechowuje zawartość koszyka i metody do dodawania/usuwania produktów.<br />
3. Pages - Pełne strony aplikacji, zazwyczaj składają się z kilku komponentów i obsługują routing.<br />
   o Home.js → Strona główna z listą produktów i wyszukiwarką.<br />
