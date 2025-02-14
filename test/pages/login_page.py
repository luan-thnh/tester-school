from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

class LoginPage:
    def __init__(self, driver):
        self.driver = driver
        self.username_input = (By.NAME, "username")  # Tên trường input username
        self.password_input = (By.NAME, "password")  # Tên trường input password
        self.login_button = (By.XPATH, "//button[contains(text(), 'Login')]")  # Nút Login
        self.error_message = (By.CLASS_NAME, "text-red")  # Tin nhắn lỗi nếu login sai

    def enter_username(self, username):
        self.driver.find_element(*self.username_input).send_keys(username)

    def enter_password(self, password):
        self.driver.find_element(*self.password_input).send_keys(password)

    def click_login(self):
        self.driver.find_element(*self.login_button).click()

    def get_error_message(self):
        return self.driver.find_element(*self.error_message).text
