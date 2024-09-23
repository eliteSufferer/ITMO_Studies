import math
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import expon

big_data = [
    7.620, 2.884, 1.071, 5.749, 4.970, 10.570, 62.528, 1.616, 28.822,
    5.930, 6.855, 6.838, 8.871, 9.108, 8.435, 3.820, 2.886, 12.099, 9.971,
    11.083, 13.660, 9.349, 9.579, 9.861, 11.754, 4.655, 9.085, 8.584, 3.145,
    4.476, 7.574, 2.512, 31.883, 47.886, 30.901, 2.295, 12.014, 0.054, 11.706,
    2.073, 10.947, 2.941, 64.117, 1.224, 6.949, 8.070, 7.955, 14.973, 3.697,
    29.292, 7.590, 63.731, 5.839, 4.105, 9.583, 2.106, 6.430, 3.281, 8.461,
    8.412, 4.833, 4.570, 3.412, 1.481, 5.364, 61.793, 6.463, 3.155, 9.496,
    11.164, 0.386, 10.193, 2.390, 7.095, 20.001, 2.469, 4.955, 6.264, 9.139,
    8.234, 7.522, 2.553, 9.877, 6.316, 2.923, 9.274, 10.161, 9.610, 5.761,
    10.172, 9.142, 7.299, 190.451, 10.475, 8.894, 8.488, 9.524, 2.916, 10.417,
    10.018, 7.876, 10.518, 99.773, 5.410, 9.686, 36.167, 5.837, 6.014, 7.174,
    1.113, 13.864, 6.531, 1.643, 8.620, 7.305, 2.412, 8.206, 9.620, 2.124,
    6.524, 3.268, 17.613, 4.751, 8.705, 9.732, 6.985, 9.949, 7.031, 8.511,
    1.853, 5.094, 10.420, 9.867, 19.244, 9.780, 74.230, 9.399, 3.672, 10.384,
    64.086, 0.489, 13.153, 3.420, 2.361, 9.353, 3.759, 10.194, 6.853, 7.930,
    7.651, 14.302, 3.828, 3.261, 3.156, 2.556, 10.932, 11.551, 4.312, 1.706,
    8.618, 3.347, 6.847, 9.771, 11.309, 86.049, 1.088, 7.332, 2.546, 7.173,
    14.971, 1.787, 6.366, 14.414, 6.929, 9.430, 7.444, 5.733, 42.227, 11.260,
    3.809, 11.008, 8.861, 8.041, 4.998, 4.491, 3.954, 8.572, 11.560, 6.104,
    4.474, 11.110, 10.670, 9.083, 9.772, 12.567, 2.748, 21.858, 6.612, 5.153,
    6.162, 64.132, 6.719, 36.787, 4.386, 7.796, 4.021, 1.859, 2.201, 7.116,
    30.713, 4.328, 7.418, 6.791, 14.708, 1.501, 3.181, 12.522, 7.729, 22.967,
    2.943, 9.754, 1.387, 2.790, 2.999, 3.826, 40.473, 3.713, 7.289, 53.981,
    5.723, 9.355, 1.243, 5.519, 7.474, 2.905, 5.438, 3.911, 4.354, 3.342,
    2.141, 10.785, 0.828, 2.307, 4.246, 7.045, 8.108, 101.842, 8.448, 8.926,
    1.776, 2.400, 6.777, 283.167, 66.874, 5.562, 27.519, 9.011, 19.615, 3.642,
    10.744, 11.754, 8.976, 11.782, 3.373, 7.164, 6.557, 1.868, 5.354, 9.474,
    10.393, 9.542, 6.752, 69.339, 6.023, 4.010, 10.793, 4.938, 1.975, 1.361,
    9.758, 46.763, 7.811, 9.448, 2.685, 6.111, 13.302, 49.204, 0.735, 9.387,
    1.843, 5.431, 0.991, 10.205, 11.241, 4.200, 5.943, 4.313, 23.806, 2.796,
    5.045
]
slices = [10, 20, 50, 100, 200, 300]

# Математическое ожидание (среднее значение)
def calculate_mean(data):
    return sum(data) / len(data)

# Дисперсия (выборочная)
def calculate_variance(data, mean_value):
    # Выборочная дисперсия (деление на n - 1)
    variance = sum((x - mean_value) ** 2 for x in data) / (len(data) - 1)
    return variance

# Среднеквадратическое отклонение
def calculate_std_dev(variance_value):
    return math.sqrt(variance_value)

# Коэффициент вариации
def calculate_coef_variation(std_dev_value, mean_value):
    return std_dev_value / mean_value

# Доверительный интервал (t-распределение)
def calculate_confidence_interval_manual(data, mean_value, confidence_level, index):
    # Размер выборки
    n = len(data)
    # Стандартное отклонение
    std_dev_value = calculate_std_dev(calculate_variance(data, mean_value))
    # Стандартная ошибка среднего
    se = std_dev_value / math.sqrt(n)

    # Значения квантилей для t-распределения по индексам
    student_value = {
        0.9: [1.833, 1.729, 1.6766, 1.6604, 1.6525, 1.65],
        0.95: [2.262, 2.093, 2.0096, 1.984, 1.972, 1.968],
        0.99: [3.25, 2.861, 2.68, 2.626, 2.601, 2.592]
    }

    # Получаем квантиль для нужного уровня доверия и соответствующего индекса
    t_value = student_value[confidence_level][index]

    # Вычисляем доверительный интервал
    margin_of_error = t_value * se
    return mean_value - margin_of_error, mean_value + margin_of_error

# Относительные отклонения от эталонных значений
def calculate_relative_deviation(data, best_value):
    return [(x - best_value) / best_value * 100 for x in data]

def draw_values_plot(data):
    plt.figure(figsize=(10, 5))
    plt.plot(data)
    plt.title("Sequence of Numbers")
    plt.xlabel("Index")
    plt.ylabel("Value")
    plt.grid(True)
    plt.show()


def frequency_hist(data):
    plt.figure(figsize=(10, 6))
    plt.hist(data, bins=30, edgecolor='black')
    plt.title("Гистограмма распределения частот")
    plt.xlabel("Значения")
    plt.ylabel("Частота")
    plt.grid(True)
    plt.show()


# Оптимизированная версия вычисления автокорреляции
def perform_autocorrelation(data, max_lag):
    """
    Оптимизированное вычисление автокорреляции для диапазона лагов.
    """
    n = len(data)
    mean_value = sum(data) / n
    variance = sum((x - mean_value) ** 2 for x in data)

    autocorrelations = []

    for lag in range(1, max_lag + 1):
        # Используем numpy для среза данных и умножения массивов
        numerator = sum((data[i] - mean_value) * (data[i + lag] - mean_value) for i in range(n - lag))
        autocorrelations.append(numerator / variance)

    return autocorrelations


# Функция для построения автокорреляционного анализа
def task_autocorrelation_analysis(data, max_lag=20):
    """
    Выполнение оптимизированного автокорреляционного анализа до указанного лага.
    """
    autocorrelations = perform_autocorrelation(data, max_lag)

    # Построение графика автокорреляции
    plt.figure(figsize=(10, 6))
    plt.stem(range(1, max_lag + 1), autocorrelations)
    plt.title("График автокорреляции")
    plt.xlabel("Лаг")
    plt.ylabel("Автокорреляция")
    plt.grid(True)
    plt.show()
    return autocorrelations


def approximate_law(sko, mean):
    # Рассчитаем коэффициент вариации
    coefficient_of_variation = sko / mean

    print("Коэффициент вариации: ", coefficient_of_variation)

    # Поскольку C_v > 1, мы используем гиперэкспоненциальное распределение (простая аппроксимация)
    # В данной задаче мы подберем параметры для визуализации и аппроксимации.

    # Параметры для двух экспоненциальных компонент (примитивная гиперэкспоненциальная аппроксимация)
    lambda_1 = 1 / (mean_value / 2)  # Для одной компоненты возьмем среднее значение меньшее вдвое
    lambda_2 = 1 / (mean_value * 1.5)  # Для другой компоненты возьмем среднее значение большее в 1.5 раза

    # Смешанное распределение
    def hyperexp_pdf(x, p1 = 0.5):
        return p1 * expon.pdf(x, scale=1 / lambda_1) + (1 - p1) * expon.pdf(x, scale=1 / lambda_2)

    # Построим гистограмму данных и аппроксимацию
    plt.figure(figsize=(12, 6))
    plt.hist(data, bins=30, density=True, alpha=0.6, color='g', edgecolor='black', label="Гистограмма данных")

    # Построим гиперэкспоненциальное распределение
    x = np.linspace(min(data), max(data), 1000)
    plt.plot(x, hyperexp_pdf(x), 'r-', lw=2, label='Гиперэкспоненциальное распределение (аппроксимация)')

    plt.title("Аппроксимация распределения: гиперэкспоненциальное распределение")
    plt.xlabel("Значения")
    plt.ylabel("Плотность вероятности")
    plt.legend()
    plt.grid(True)
    plt.show()

    return lambda_1, lambda_2

# Генерация выборки из гиперэкспоненциального распределения
def hyperexponential_sample(p1, p2, lambda1, lambda2, size=1000):
    # Генерация случайных чисел для смешивания
    uniform_random = np.random.uniform(0, 1, size)

    # Если случайное число меньше p1, используем λ1, иначе — λ2
    exponential_samples = np.where(uniform_random < p1,
                                   np.random.exponential(1 / lambda1, size),
                                   np.random.exponential(1 / lambda2, size))
    return exponential_samples


for idx, val in enumerate(slices):
    print(f'_____________{val}_____________')
    data = big_data[:val]


    mean_value = calculate_mean(data)
    print(f"Математическое ожидание: {mean_value}")

    # Дисперсия
    variance_value = calculate_variance(data, mean_value)
    print(f"Дисперсия: {variance_value}")

    # Среднеквадратическое отклонение
    std_dev_value = calculate_std_dev(variance_value)
    print(f"Среднеквадратическое отклонение: {std_dev_value}")

    # Коэффициент вариации
    coef_variation = calculate_coef_variation(std_dev_value, mean_value)
    print(f"Коэффициент вариации: {coef_variation}")

    # Доверительные интервалы для разных уровней доверия
    confidence_levels = [0.9, 0.95, 0.99]
    for confidence in confidence_levels:
        lower_bound, upper_bound = calculate_confidence_interval_manual(data, mean_value, confidence, idx)
        print(f"Доверительный интервал ({int(confidence * 100)}%): ({lower_bound}, {upper_bound})")

    # Относительное отклонение от эталонных значений (например, последних трех)
    best_value = calculate_mean(data[-3:])
    relative_deviation = calculate_relative_deviation(data, best_value)
    print(f"Относительные отклонения от эталонных значений: {relative_deviation}")

    # График значений
    draw_values_plot(data)

    # Гистограмма частот
    frequency_hist(data)

    # Автокорреляционный анализ
    task_autocorrelation_analysis(data)

    # Аппроксимация закона распределения, получе
    lambda1, lambda2 = approximate_law(std_dev_value, mean_value)

    # Генератор случайных чисел
    # Генерация выборки на основе гиперэкспоненциального распределения
    generated_samples = hyperexponential_sample(0.5, 0.5, lambda1, lambda2, size=1000)

    print(generated_samples)

    # Визуализация гистограммы сгенерированных данных
    plt.hist(generated_samples, bins=50, density=True, alpha=0.6, color='g')
    plt.title(f'Гистограмма гиперэкспоненциального распределения для выборки {val}')
    plt.xlabel('Значения')
    plt.ylabel('Плотность')
    plt.grid(True)
    plt.show()