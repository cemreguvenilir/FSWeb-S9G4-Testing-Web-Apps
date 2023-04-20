import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const header = screen.getByText(/İletişim Formu/i);
  expect(header).toBeInTheDocument();
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const name = screen.getByTestId("name-input");
  userEvent.type(name, "abcd");
  const error = screen.getByTestId("error-name");
  expect(error).toBeInTheDocument();
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const button = screen.getByTestId("button-test");
  userEvent.click(button);
  const nameError = screen.getByTestId("error-name");
  expect(nameError).toBeInTheDocument();
  const surnameError = screen.getByTestId("error-surname");
  expect(surnameError).toBeInTheDocument();
  const mailError = screen.getByTestId("error-mail");
  expect(mailError).toBeInTheDocument();
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const name = screen.getByTestId("name-input");
  userEvent.type(name, "cemre");
  const surname = screen.getByTestId("surname-input");
  userEvent.type(surname, "güvenilir");
  const button = screen.getByTestId("button-test");
  userEvent.click(button);
  const mailError = screen.getByTestId("error-mail");
  expect(mailError).toBeInTheDocument();
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const mail = screen.getByTestId("mail-input");
  userEvent.type(mail, "cemreguvenilir.com");
  const mailError = screen.getByTestId("error-mail");
  expect(mailError).toHaveTextContent(
    "email geçerli bir email adresi olmalıdır"
  );
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const name = screen.getByTestId("name-input");
  userEvent.type(name, "cemre");
  const mail = screen.getByTestId("mail-input");
  userEvent.type(mail, "guvenilircemre@gmail.com");
  const button = screen.getByTestId("button-test");
  userEvent.click(button);
  const surnameError = screen.getByTestId("error-surname");
  expect(surnameError).toBeInTheDocument();
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<IletisimFormu />);
  const name = screen.getByTestId("name-input");
  userEvent.type(name, "cemre");
  const surname = screen.getByTestId("surname-input");
  userEvent.type(surname, "güvenilir");
  const mail = screen.getByTestId("mail-input");
  userEvent.type(mail, "guvenilircemre@gmail.com");
  const button = screen.getByTestId("button-test");
  userEvent.click(button);
  expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  render(<IletisimFormu />);
  const name = screen.getByTestId("name-input");
  userEvent.type(name, "cemre");
  const surname = screen.getByTestId("surname-input");
  userEvent.type(surname, "güvenilir");
  const mail = screen.getByTestId("mail-input");
  userEvent.type(mail, "guvenilircemre@gmail.com");
  const message = screen.getByTestId("message-input");
  userEvent.type(message, "hoş geldin!");
  const button = screen.getByTestId("button-test");
  userEvent.click(button);
});
